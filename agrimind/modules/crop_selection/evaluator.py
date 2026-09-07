from typing import List, Dict, Any, Optional
from agrimind.core.base_models import CropProfile, SoilSample
from agrimind.data import ALL_CROPS
from agrimind.modules.crop_selection.suitability_matrix import SuitabilityMatrixEngine
from agrimind.modules.crop_selection.thermal_units import ThermalUnitCalculator

class CropSelectionEvaluator:
    def __init__(self, crop_catalog: Optional[Dict[str, CropProfile]] = None):
        self.catalog = crop_catalog or ALL_CROPS
        self.suitability_engine = SuitabilityMatrixEngine()
        self.thermal_calculator = ThermalUnitCalculator()

    def evaluate_all_crops(
        self,
        soil: SoilSample,
        available_water_mm: float,
        mean_temp_c: float,
        top_n: int = 10
    ) -> List[Dict[str, Any]]:
        results = []

        for crop_id, crop in self.catalog.items():
            scores = self.suitability_engine.compute_composite_score(
                crop=crop,
                soil=soil,
                available_water_mm=available_water_mm,
                mean_temp_c=mean_temp_c
            )

            is_viable = scores["composite_score"] >= 0.40

            results.append({
                "crop_id": crop.crop_id,
                "crop_name": crop.name,
                "category": crop.category.value,
                "scientific_name": crop.scientific_name,
                "composite_score": scores["composite_score"],
                "is_viable": is_viable,
                "breakdown": scores,
                "expected_yield_tonnes_ha": crop.expected_yield_tonnes_ha,
                "est_revenue_per_ha": round(crop.expected_yield_tonnes_ha * crop.market_price_per_tonne, 2),
                "water_req_mm": crop.water_requirement_mm,
                "description": crop.description,
            })

        results.sort(key=lambda x: x["composite_score"], reverse=True)
        return results[:top_n]

    def filter_by_category(
        self,
        category_name: str,
        soil: SoilSample,
        available_water_mm: float,
        mean_temp_c: float
    ) -> List[Dict[str, Any]]:
        all_evals = self.evaluate_all_crops(soil, available_water_mm, mean_temp_c, top_n=100)
        return [r for r in all_evals if r["category"].lower() == category_name.lower()]
