import math
from typing import List, Dict, Any
from agrimind.core.base_models import SoilSample
from agrimind.data import ALL_CROPS

class MLCropRecommender:
    """Simulated Ensemble Machine Learning Classifier for Crop Recommendation."""

    def __init__(self):
        self.crops = list(ALL_CROPS.values())

    def predict_top_crops(
        self,
        soil: SoilSample,
        temperature: float,
        humidity: float,
        rainfall_mm: float,
        top_n: int = 5
    ) -> List[Dict[str, Any]]:
        rankings = []

        for crop in self.crops:
            # Multi-feature distance metric (simulating trained random forest / XGBoost node probabilities)
            d_n = abs(soil.nitrogen_ppm - (crop.nitrogen_requirement_kg_ha * 0.3)) / 50.0
            d_p = abs(soil.phosphorus_ppm - (crop.phosphorus_requirement_kg_ha * 0.3)) / 30.0
            d_k = abs(soil.potassium_ppm - (crop.potassium_requirement_kg_ha * 0.3)) / 150.0
            d_ph = abs(soil.ph - ((crop.optimal_ph_min + crop.optimal_ph_max) / 2.0)) / 2.0
            d_temp = abs(temperature - ((crop.optimal_temperature_min + crop.optimal_temperature_max) / 2.0)) / 10.0
            d_rain = abs(rainfall_mm - crop.water_requirement_mm) / 500.0

            distance = math.sqrt(d_n**2 + d_p**2 + d_k**2 + d_ph**2 + d_temp**2 + d_rain**2)
            prob = max(0.01, 1.0 / (1.0 + distance))

            rankings.append({
                "crop_id": crop.crop_id,
                "crop_name": crop.name,
                "category": crop.category.value,
                "ml_confidence_probability": round(prob, 4),
                "predicted_yield_tonnes_ha": crop.expected_yield_tonnes_ha,
                "market_price_per_tonne": crop.market_price_per_tonne,
            })

        rankings.sort(key=lambda x: x["ml_confidence_probability"], reverse=True)
        return rankings[:top_n]
