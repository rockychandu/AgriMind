from typing import List, Dict, Any
from agrimind.core.base_models import CropProfile, SoilSample
from agrimind.core.math_utils import calculate_topsis_scores
from agrimind.data import ALL_CROPS

class TopsisRecommender:
    """TOPSIS Multi-Criteria Decision Making Crop Recommender."""

    def __init__(self, weights: List[float] = None):
        # Default criteria weights: [Yield, Market Revenue, Water Efficiency, pH Match, Temp Match]
        self.weights = weights or [0.25, 0.30, 0.15, 0.15, 0.15]
        self.is_benefit = [True, True, True, True, True]

    def recommend_crops(
        self,
        soil: SoilSample,
        available_water_mm: float,
        mean_temp_c: float,
        top_n: int = 5
    ) -> List[Dict[str, Any]]:
        crop_list: List[CropProfile] = list(ALL_CROPS.values())
        if not crop_list:
            return []

        decision_matrix = []
        for crop in crop_list:
            yield_val = crop.expected_yield_tonnes_ha
            rev_val = yield_val * crop.market_price_per_tonne
            water_eff = yield_val / max(1.0, crop.water_requirement_mm / 1000.0)

            # Match penalties
            ph_penalty = 1.0 - min(1.0, abs(soil.ph - ((crop.optimal_ph_min + crop.optimal_ph_max) / 2.0)) / 2.0)
            temp_penalty = 1.0 - min(1.0, abs(mean_temp_c - ((crop.optimal_temperature_min + crop.optimal_temperature_max) / 2.0)) / 10.0)

            row = [
                max(0.1, yield_val),
                max(1.0, rev_val),
                max(0.1, water_eff),
                max(0.1, ph_penalty),
                max(0.1, temp_penalty)
            ]
            decision_matrix.append(row)

        scores = calculate_topsis_scores(decision_matrix, self.weights, self.is_benefit)

        results = []
        for i, crop in enumerate(crop_list):
            results.append({
                "crop_id": crop.crop_id,
                "crop_name": crop.name,
                "category": crop.category.value,
                "topsis_score": round(scores[i], 4),
                "expected_yield_ha": crop.expected_yield_tonnes_ha,
                "estimated_revenue_ha": round(crop.expected_yield_tonnes_ha * crop.market_price_per_tonne, 2),
                "water_requirement_mm": crop.water_requirement_mm,
            })

        results.sort(key=lambda x: x["topsis_score"], reverse=True)
        return results[:top_n]
