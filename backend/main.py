from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import replicate
from io import BytesIO
from PIL import Image
import time
from httpx import Timeout
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


replicate_api_token = os.getenv("REPLICATE_API_TOKEN")
if not replicate_api_token:
    print("WARNING: REPLICATE_API_TOKEN environment variable is not set.")
    print("The Replicate client will try to read it from environment, but API calls may fail.")
    print("Please set REPLICATE_API_TOKEN in your .env file or environment variables.")

# Initialize client - it will use REPLICATE_API_TOKEN from env if api_token is not provided
replicate_client = replicate.Client(
    api_token=replicate_api_token if replicate_api_token else None,
    timeout=Timeout(300.0)
)

@app.get("/")
async def root():
    return {"message": "PastPerfect API is running"}

def run_prediction_poll(model_or_version, input_data):
    """Run a Replicate prediction and poll until completion
    model_or_version can be either a model name (e.g., 'flux-kontext-apps/restore-image') 
    or a version hash"""
    # If it contains a slash, it's a model name; otherwise it's a version hash
    if '/' in model_or_version:
        prediction = replicate_client.predictions.create(
            model=model_or_version,
            input=input_data
        )
    else:
        prediction = replicate_client.predictions.create(
            version=model_or_version,
            input=input_data
        )
    print(f"Created prediction {prediction.id}, status: {prediction.status}")
    
    while prediction.status not in ["succeeded", "failed", "canceled"]:
        time.sleep(2)
        prediction = replicate_client.predictions.get(prediction.id)
        print(f"Prediction status: {prediction.status}")
    
    if prediction.status == "succeeded":
        output = prediction.output
        if isinstance(output, list):
            return output[0]
        return str(output)
    else:
        # Get detailed error information
        error_msg = f"Prediction failed with status: {prediction.status}"
        if hasattr(prediction, 'error') and prediction.error:
            error_msg += f"\nError: {prediction.error}"
        if hasattr(prediction, 'logs') and prediction.logs:
            error_msg += f"\nLogs: {prediction.logs}"
        print(f"Prediction failure details: {error_msg}")
        raise Exception(error_msg)

@app.get("/restore")
async def restore():
    try:
        # Get the path to testimg.jpg in the backend directory
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        testimg_path = os.path.join(backend_dir, "testimg.jpg")
        
        if not os.path.exists(testimg_path):
            return JSONResponse(
                status_code=404,
                content={"success": False, "error": f"testimg.jpg not found at {testimg_path}"}
            )
        
        print(f"Reading testimg.jpg from: {testimg_path}")
        
        # Upload image to imgbb (temporary hosting service) so Replicate can access it
        # Replicate models need URLs, not local file paths
        def upload_to_imgbb(local_path, imgbb_api_key):
            """Upload a local file to imgbb and return the URL"""
            with open(local_path, "rb") as f:
                response = requests.post(
                    "https://api.imgbb.com/1/upload",
                    params={"key": imgbb_api_key},
                    files={"image": f}
                )
            response.raise_for_status()
            json_data = response.json()
            return json_data["data"]["url"]
        
        # Upload the image to imgbb
        image_url = upload_to_imgbb(testimg_path, imgbb_api_key)
        print(f"Uploaded to imgbb, URL: {image_url}")
        
        # Process through FLUX Kontext restore-image model
        print("Starting image restoration with FLUX Kontext...")
        restored_url = run_prediction_poll(
            "flux-kontext-apps/restore-image",
            {"input_image": image_url}
        )
        print(f"Restoration complete, result URL: {restored_url}")
        
        # Download the restored image
        print("Downloading restored image...")
        response = requests.get(restored_url)
        response.raise_for_status()
        
        # Save the image as testimg_output.jpg
        output_path = os.path.join(backend_dir, "testimg_output.jpg")
        with open(output_path, "wb") as f:
            f.write(response.content)
        print(f"Saved restored image to: {output_path}")
        
        return JSONResponse(content={
            "success": True,
            "original": image_url,
            "restored": restored_url,
            "output_file": output_path
        })
        
    except Exception as e:
        import traceback
        error_msg = str(e)
        traceback.print_exc()
        print(f"Error in /restore endpoint: {error_msg}")
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": error_msg}
        )
