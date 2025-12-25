from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
import replicate
from io import BytesIO
from PIL import Image
import base64
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()


def restore_image(image_path: str):
    input = {
        "input_image": image_path,
    }

    output = replicate.run(
        "flux-kontext-apps/restore-image",
        input=input,
    )

    print(output.url())

    with open("output.png", "wb") as file:
        file.write(output.read())


@app.post("/restore")
async def restore(file: UploadFile = File):
    
