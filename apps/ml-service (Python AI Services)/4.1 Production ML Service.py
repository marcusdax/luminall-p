# apps/ml-service/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import logging
from typing import List, Optional
import numpy as np
from model_loader import ModelLoader

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Luminall ML Service",
    description="Production AI/ML Services for PropertyInsight",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DamagePredictionRequest(BaseModel):
    hail_size: float
    wind_speed: float
    roof_age: int
    roof_type: str
    property_data: Optional[dict] = None

class DamagePredictionResponse(BaseModel):
    damage_score: int
    confidence: float
    factors: dict
    recommendation: str

# Load models at startup
model_loader = ModelLoader()

@app.on_event("startup")
async def startup_event():
    logger.info("Loading ML models...")
    await model_loader.load_models()
    logger.info("ML models loaded successfully")

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "ml-service",
        "models_loaded": model_loader.models_loaded
    }

@app.post("/predict/damage", response_model=DamagePredictionResponse)
async def predict_damage(request: DamagePredictionRequest):
    """
    Production endpoint for damage probability prediction
    """
    try:
        logger.info(f"Predicting damage for request: {request}")
        
        # Use trained model for prediction
        prediction = await model_loader.predict_damage(request)
        
        logger.info(f"Damage prediction completed: {prediction.damage_score}")
        return prediction
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail="Prediction failed")

@app.post("/analyze/roof-image")
async def analyze_roof_image(image_url: str):
    """
    Analyze roof damage from uploaded images
    """
    try:
        # Computer vision analysis
        analysis = await model_loader.analyze_roof_image(image_url)
        return analysis
    except Exception as e:
        logger.error(f"Image analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail="Image analysis failed")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=False,  # Disable reload in production
        workers=4,     # Multiple workers for production
        access_log=True
    )