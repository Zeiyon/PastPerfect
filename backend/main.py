from fastapi import FastAPI
from fastapi.responses import JSONResponse
import traceback
import replicate
import time
from httpx import Timeout

app = FastAPI()
replicate_client = replicate.Client(timeout=Timeout(300.0))

def safe_output(output):
    if isinstance(output, list):
        return output[0]
    try:
        return str(output)
    except Exception:
        return output

def run_prediction_poll(version, input):
    prediction = replicate_client.predictions.create(
        version=version,
        input=input
    )
    while prediction.status not in ["succeeded", "failed", "canceled"]:
        time.sleep(2)
        prediction = replicate_client.predictions.get(prediction.id)
    
    print("Prediction logs:", prediction.logs)

    if prediction.status == "succeeded":
        return safe_output(prediction.output)
    else:
        raise Exception(f"Prediction failed: {prediction.status}")

@app.get("/restore")
async def restore_image():
    try:
        # Original input
        img_url = "https://i.ibb.co/Y75tRWjW/image.png"

        # 1. Denoise / cleanup
        denoised_output = run_prediction_poll(
            "660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a",
            {"jpeg": 40, "image": img_url, "noise": 15}
        )
        print("Denoised =", denoised_output)

        # 2. Colorize
        colorized_output = run_prediction_poll(
            "0da600fab0c45a66211339f1c16b71345d22f26ef5fea3dca1bb90bb5711e950",
            {"model_name": "Artistic", "input_image": denoised_output}
        )
        print("Colorized =", colorized_output)

        # 3. Depth map
        depth_output = run_prediction_poll(
            "6375723d97400d3ac7b88e3022b738bf6f433ae165c4a2acd1955eaa6b8fcb62",
            {"image": colorized_output}
        )
        print("Depth =", depth_output)

        # 4. Restore faces
        faces_output = run_prediction_poll(
            "cc4956dd26fa5a7185d5660cc9100fab1b8070a1d1654a8bb5eb6d443b020bb2",
            {"image": colorized_output, "codeformer_fidelity": 0.1}
        )
        print("Faces restored =", faces_output)

        # 5. Final enhancement with ControlNet SDXL
        final_output = run_prediction_poll(
            "lucataco/sdxl-controlnet:06d6fae3b75ab68a28cd2900afa6033166910dd09fd9751047043a5bbb4c184b",
            {
                "image": faces_output,
                "conditioning": [
                    {"type": "depth", "image": depth_output}
                ],
                "prompt": "restored original photo, no changes, sharp and clear",
                "width": 768,
                "height": 768,
                "num_inference_steps": 25,
                "apply_watermark": False
            }
        )
        print("Final enhanced =", final_output)

        return JSONResponse(content={
            "original": img_url,
            "denoised": denoised_output,
            "colorized": colorized_output,
            "depth": depth_output,
            "faces_restored": faces_output,
            "final_enhanced": final_output
        })

    except Exception as e:
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})
