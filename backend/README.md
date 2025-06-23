# FastAPI Backend for PastPerfect

This backend serves the static files from the frontend build using FastAPI.

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Make sure you have built the frontend:
   ```bash
   cd ../frontend
   npm install
   npm run build
   ```
   This will generate the `dist` folder in the frontend directory.

3. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   (Run this command from the `backend` directory)

4. Open your browser and go to [http://localhost:8000](http://localhost:8000) 