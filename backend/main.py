from fastapi import FastAPI
from fastapi.responses import JSONResponse
import traceback
import replicate
import time
import requests
import numpy as np
import cv2
from io import BytesIO
from PIL import Image
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

def download_and_resize_image(url, max_size=1024):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    img.thumbnail((max_size, max_size))
    local_path = "resized_input.png"
    img.save(local_path)
    return local_path

def generate_smart_scratch_mask(image_path, mask_path="mask.png"):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    blurred = cv2.medianBlur(img, 3)
    edges = cv2.Canny(blurred, threshold1=30, threshold2=100)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    dilated = cv2.dilate(edges, kernel, iterations=1)
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(dilated, connectivity=8)
    min_area = 30
    mask = np.zeros_like(dilated)
    for i in range(1, num_labels):
        if stats[i, cv2.CC_STAT_AREA] > min_area:
            mask[labels == i] = 255
    mask = cv2.ximgproc.thinning(mask)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    thick_mask = cv2.dilate(mask, kernel, iterations=1)
    cv2.imwrite(mask_path, thick_mask)
    return mask_path

def upload_to_imgbb(local_path, imgbb_api_key):
    with open(local_path, "rb") as f:
        response = requests.post(
            "https://api.imgbb.com/1/upload",
            params={"key": imgbb_api_key},
            files={"image": f}
        )
    json_data = response.json()
    return json_data["data"]["url"]

@app.get("/restore")
async def restore_image():
    try:
        # Config
        img_url = "https://i.ibb.co/XrW0JRy4/Stephen-wedding-Scan-2.jpg"
        imgbb_api_key = "7a6c28a2611a933130804a2663888d5a"  # <-- set your imgbb API key here

        # === Download & resize input ===
        resized_path = download_and_resize_image(img_url)
        print("[OK] Resized input image")

        # === Generate smarter mask ===
        mask_path = generate_smart_scratch_mask(resized_path)
        print("[OK] Generated improved scratch mask")

        # === Upload images for LaMa ===
        input_image_url = upload_to_imgbb(resized_path, imgbb_api_key)
        mask_image_url = upload_to_imgbb(mask_path, imgbb_api_key)
        print("[OK] Uploaded image and mask to imgbb")

        # === Run LaMa to remove scratches ===
        cleaned_output = run_prediction_poll(
            "allenhooo/lama:cdac78a1bec5b23c07fd29692fb70baa513ea403a39e643c48ec5edadb15fe72",
            {
                "mask": mask_image_url,
                "image": input_image_url
            }
        )
        print("[OK] LaMa cleaned =", cleaned_output)

        # === Continue with your pipeline ===
        denoised_output = run_prediction_poll(
            "660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a",
            {"jpeg": 40, "image": cleaned_output, "noise": 15}
        )
        print("[OK] Denoised =", denoised_output)

        colorized_output = run_prediction_poll(
            "0da600fab0c45a66211339f1c16b71345d22f26ef5fea3dca1bb90bb5711e950",
            {"model_name": "Artistic", "input_image": denoised_output}
        )
        print("[OK] Colorized =", colorized_output)

        depth_output = run_prediction_poll(
            "6375723d97400d3ac7b88e3022b738bf6f433ae165c4a2acd1955eaa6b8fcb62",
            {"image": colorized_output}
        )
        print("[OK] Depth =", depth_output)

        faces_output = run_prediction_poll(
            "cc4956dd26fa5a7185d5660cc9100fab1b8070a1d1654a8bb5eb6d443b020bb2",
            {"image": colorized_output, "codeformer_fidelity": 0.1}
        )
        print("[OK] Faces restored =", faces_output)

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
        print("[OK] Final enhanced =", final_output)

        return JSONResponse(content={
            "original": img_url,
            "lama_cleaned": cleaned_output,
            "denoised": denoised_output,
            "colorized": colorized_output,
            "depth": depth_output,
            "faces_restored": faces_output,
            "final_enhanced": final_output
        })

    except Exception as e:
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})
