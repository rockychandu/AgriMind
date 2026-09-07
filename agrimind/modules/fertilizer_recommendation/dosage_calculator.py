from typing import Dict, Any
from agrimind.core.base_models import SoilSample, CropProfile
from agrimind.modules.soil_analysis.nutrient_calculator import SoilNutrientCalculator
from agrimind.modules.fertilizer_recommendation.npk_blender import FertilizerBlender

class DosageCalculator:
    """Target-yield based fertilizer dosage calculator."""

    def __init__(self):
        self.soil_calc = SoilNutrientCalculator()
        self.blender = FertilizerBlender()

    def compute_recommendation(
        self,
        soil: SoilSample,
        crop: CropProfile,
        target_yield_multiplier: float = 1.0
    ) -> Dict[str, Any]:
        adj_n_req = crop.nitrogen_requirement_kg_ha * target_yield_multiplier
        adj_p_req = crop.phosphorus_requirement_kg_ha * target_yield_multiplier
        adj_k_req = crop.potassium_requirement_kg_ha * target_yield_multiplier

        deficits = self.soil_calc.compute_fertilizer_deficits(soil, crop)

        blend = self.blender.calculate_fertilizer_blend(
            n_deficit_kg_ha=deficits["nitrogen_deficit_kg_ha"],
            p_deficit_kg_ha=deficits["phosphorus_deficit_kg_ha"],
            k_deficit_kg_ha=deficits["potassium_deficit_kg_ha"]
        )

        total_cost = sum(b["cost_per_ha"] for b in blend)

        return {
            "crop_id": crop.crop_id,
            "crop_name": crop.name,
            "target_yield_tonnes_ha": round(crop.expected_yield_tonnes_ha * target_yield_multiplier, 2),
            "nutrient_deficits": deficits,
            "recommended_fertilizer_blend": blend,
            "total_estimated_cost_per_ha": round(total_cost, 2),
        }
