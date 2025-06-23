from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

# Path to the frontend build directory
frontend_dist = os.path.join(os.path.dirname(__file__), '../frontend/dist')

# Mount static files (JS, CSS, images, etc.)
app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="static")

# Optionally, serve index.html for the root path
@app.get("/")
def read_index():
    return FileResponse(os.path.join(frontend_dist, "index.html")) 