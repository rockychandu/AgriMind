from typing import Dict, Any, List
from agrimind.core.base_models import SoilSample, CropProfile
from agrimind.core.domain_types import NutrientStatus
from agrimind.core.math_utils import convert_ppm_to_kg_ha

class SoilNutrientCalculator:
    def __init__(self):
        self.critical_thresholds_ppm = {
            "nitrogen": {"low": 20.0, "optimal": 40.0, "high": 80.0},
            "phosphorus": {"low": 12.0, "optimal": 25.0, "high": 50.0},
            "potassium": {"low": 110.0, "optimal": 180.0, "high": 300.0},
            "zinc": {"low": 0.6, "optimal": 1.5, "high": 3.0},
            "iron": {"low": 4.5, "optimal": 10.0, "high": 25.0},
            "boron": {"low": 0.5, "optimal": 1.0, "high": 2.0},
        }

    def assess_nutrient_status(self, ppm_value: float, nutrient_name: str) -> NutrientStatus:
        thresh = self.critical_thresholds_ppm.get(nutrient_name.lower())
        if not thresh:
            return NutrientStatus.OPTIMAL
        if ppm_value < thresh["low"]:
            return NutrientStatus.DEFICIENT
        elif ppm_value < thresh["optimal"]:
            return NutrientStatus.LOW
        elif ppm_value <= thresh["high"]:
            return NutrientStatus.OPTIMAL
        else:
            return NutrientStatus.HIGH

    def compute_fertilizer_deficits(self, soil: SoilSample, crop: CropProfile) -> Dict[str, float]:
        n_soil_kg_ha = convert_ppm_to_kg_ha(soil.nitrogen_ppm)
        p_soil_kg_ha = convert_ppm_to_kg_ha(soil.phosphorus_ppm)
        k_soil_kg_ha = convert_ppm_to_kg_ha(soil.potassium_ppm)

        # Soil availability efficiencies (N ~30%, P ~20%, K ~50%)
        n_available = n_soil_kg_ha * 0.30
        p_available = p_soil_kg_ha * 0.20
        k_available = k_soil_kg_ha * 0.50

        n_deficit = max(0.0, crop.nitrogen_requirement_kg_ha - n_available)
        p_deficit = max(0.0, crop.phosphorus_requirement_kg_ha - p_available)
        k_deficit = max(0.0, crop.potassium_requirement_kg_ha - k_available)

        return {
            "nitrogen_deficit_kg_ha": round(n_deficit, 2),
            "phosphorus_deficit_kg_ha": round(p_deficit, 2),
            "potassium_deficit_kg_ha": round(k_deficit, 2),
            "soil_n_kg_ha": round(n_soil_kg_ha, 2),
            "soil_p_kg_ha": round(p_soil_kg_ha, 2),
            "soil_k_kg_ha": round(k_soil_kg_ha, 2),
        }

    def generate_full_soil_report(self, soil: SoilSample) -> Dict[str, Any]:
        return {
            "sample_id": soil.sample_id,
            "ph": soil.ph,
            "ec_ds_m": soil.ec_ds_m,
            "organic_carbon_pct": soil.organic_carbon_percentage,
            "nutrients": {
                "nitrogen": {"ppm": soil.nitrogen_ppm, "status": self.assess_nutrient_status(soil.nitrogen_ppm, "nitrogen").value},
                "phosphorus": {"ppm": soil.phosphorus_ppm, "status": self.assess_nutrient_status(soil.phosphorus_ppm, "phosphorus").value},
                "potassium": {"ppm": soil.potassium_ppm, "status": self.assess_nutrient_status(soil.potassium_ppm, "potassium").value},
                "zinc": {"ppm": soil.zinc_ppm, "status": self.assess_nutrient_status(soil.zinc_ppm, "zinc").value},
                "iron": {"ppm": soil.iron_ppm, "status": self.assess_nutrient_status(soil.iron_ppm, "iron").value},
                "boron": {"ppm": soil.boron_ppm, "status": self.assess_nutrient_status(soil.boron_ppm, "boron").value},
            }
        }
