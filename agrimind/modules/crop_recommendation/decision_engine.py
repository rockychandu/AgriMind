from typing import List, Dict, Any
from agrimind.core.base_models import SoilSample
from agrimind.modules.crop_recommendation.topsis_mcdm import TopsisRecommender
from agrimind.modules.crop_recommendation.ml_recommender import MLCropRecommender

class CropRecommendationEngine:
    """Unified Multi-Engine Crop Recommendation System."""

    def __init__(self):
        self.topsis_engine = TopsisRecommender()
        self.ml_engine = MLCropRecommender()

    def generate_recommendations(
        self,
        soil: SoilSample,
        available_water_mm: float,
        mean_temp_c: float,
        humidity_pct: float = 65.0,
        top_n: int = 5
    ) -> List[Dict[str, Any]]:
        topsis_recs = self.topsis_engine.recommend_crops(
            soil=soil,
            available_water_mm=available_water_mm,
            mean_temp_c=mean_temp_c,
            top_n=top_n * 2
        )

        ml_recs = self.ml_engine.predict_top_crops(
            soil=soil,
            temperature=mean_temp_c,
            humidity=humidity_pct,
            rainfall_mm=available_water_mm,
            top_n=top_n * 2
        )

        # Merge TOPSIS & ML Scores into hybrid ensemble score
        combined = {}
        for r in topsis_recs:
            cid = r["crop_id"]
            combined[cid] = {
                **r,
                "hybrid_score": r["topsis_score"] * 0.5
            }

        for r in ml_recs:
            cid = r["crop_id"]
            if cid in combined:
                combined[cid]["hybrid_score"] += r["ml_confidence_probability"] * 0.5
                combined[cid]["ml_probability"] = r["ml_confidence_probability"]
            else:
                combined[cid] = {
                    "crop_id": cid,
                    "crop_name": r["crop_name"],
                    "category": r["category"],
                    "topsis_score": 0.5,
                    "hybrid_score": r["ml_confidence_probability"] * 0.5,
                    "expected_yield_ha": r["predicted_yield_tonnes_ha"],
                    "estimated_revenue_ha": round(r["predicted_yield_tonnes_ha"] * r["market_price_per_tonne"], 2),
                    "water_requirement_mm": available_water_mm,
                    "ml_probability": r["ml_confidence_probability"]
                }

        final_list = list(combined.values())
        final_list.sort(key=lambda x: x["hybrid_score"], reverse=True)
        return final_list[:top_n]
