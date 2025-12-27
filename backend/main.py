from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import replicate
import time
import requests
import os
from httpx import Timeout
from dotenv import load_dotenv

load_dotenv()

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load configuration
IMGBB_API_KEY = os.getenv("IMGBB_API_KEY")
REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")

if not REPLICATE_API_TOKEN:
    print("WARNING: REPLICATE_API_TOKEN not set. API calls may fail.")

if not IMGBB_API_KEY:
    print("WARNING: IMGBB_API_KEY not set. API calls may fail.")

# Initialize Replicate client
replicate_client = replicate.Client(
    api_token=REPLICATE_API_TOKEN,
    timeout=Timeout(300.0)
)

# Helper functions
def upload_to_imgbb(file_content: bytes) -> str:    
    response = requests.post(
        "https://api.imgbb.com/1/upload",
        params={"key": IMGBB_API_KEY},
        files={"image": ("image.jpg", file_content, "image/jpeg")}
    )
    
    if not response.ok:
        error_msg = f"imgbb upload failed: {response.status_code}"
        try:
            error_data = response.json()
            error_msg += f" - {error_data}"
        except:
            error_msg += f" - {response.text}"
        raise Exception(error_msg)
    
    return response.json()["data"]["url"]

def run_replicate_prediction(model_name: str, input_data: dict) -> str:
    # Run Replicate prediction and poll until completion
    prediction = replicate_client.predictions.create(
        model=model_name,
        input=input_data
    )
    print(f"Prediction {prediction.id} created, status: {prediction.status}")
    
    while prediction.status not in ["succeeded", "failed", "canceled"]:
        time.sleep(2)
        prediction = replicate_client.predictions.get(prediction.id)
        print(f"Status: {prediction.status}")
    
    if prediction.status != "succeeded":
        error = getattr(prediction, 'error', 'Unknown error')
        raise Exception(f"Prediction failed: {prediction.status}. Error: {error}")
    
    output = prediction.output
    return output[0] if isinstance(output, list) else str(output)

def get_next_filename(directory: str) -> str:
    # Get next available filename: testimg_001.jpg, testimg_002.jpg, etc.
    existing = []
    for filename in os.listdir(directory):
        if filename.startswith("testimg_") and filename.endswith(".jpg"):
            try:
                num = int(filename.replace("testimg_", "").replace(".jpg", ""))
                existing.append(num)
            except ValueError:
                continue
    
    next_num = max(existing) + 1 if existing else 1
    return f"testimg_{next_num:03d}.jpg"

# API endpoints
@app.get("/")
async def root():
    return {"message": "PastPerfect API is running"}

@app.post("/restore")
async def restore(file: UploadFile = File(...)):
    # Upload image, restore via Replicate, and save result
    try:
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        file_content = await file.read()
        
        # Upload to imgbb (Replicate needs a URL, not local file)
        print("Uploading to imgbb...")
        image_url = upload_to_imgbb(file_content)
        
        # Process through Replicate
        print("Processing with Replicate...")
        restored_url = run_replicate_prediction(
            "flux-kontext-apps/restore-image",
            {"input_image": image_url}
        )
        
        # Download and save restored image
        print("Downloading restored image...")
        response = requests.get(restored_url)
        response.raise_for_status()
        
        filename = get_next_filename(backend_dir)
        filepath = os.path.join(backend_dir, filename)
        
        with open(filepath, "wb") as f:
            f.write(response.content)
        
        print(f"Saved: {filepath}")
        
        return JSONResponse(content={
            "success": True,
            "original": image_url,
            "restored": restored_url,
            "saved_file": filename,
            "saved_path": filepath
        })
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )
