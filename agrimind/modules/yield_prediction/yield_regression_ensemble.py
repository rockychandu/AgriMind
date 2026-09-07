from typing import Dict, Any
from agrimind.core.base_models import SoilSample, CropProfile
from agrimind.modules.yield_prediction.biomass_growth_model import BiomassGrowthSimulator
from agrimind.modules.yield_prediction.stress_penalty_calculator import StressPenaltyCalculator

class YieldRegressionEnsemble:
    """Multi-factor Yield Prediction Ensemble Engine."""

    def __init__(self):
        self.biomass_sim = BiomassGrowthSimulator()
        self.stress_calc = StressPenaltyCalculator()

    def predict_crop_yield(
        self,
        crop: CropProfile,
        soil: SoilSample,
        available_water_mm: float,
        mean_temp_c: float,
        pest_severity_score: float = 0.0
    ) -> Dict[str, Any]:
        potential_yield = crop.expected_yield_tonnes_ha

        penalties = self.stress_calc.compute_stress_penalties(
            crop=crop,
            soil=soil,
            water_supplied_mm=available_water_mm,
            mean_temperature_c=mean_temp_c,
            pest_disease_severity_score=pest_severity_score
        )

        predicted_yield = potential_yield * penalties["yield_retained_factor"]
        ci_min = predicted_yield * 0.88
        ci_max = predicted_yield * 1.12

        return {
            "crop_id": crop.crop_id,
            "crop_name": crop.name,
            "potential_yield_tonnes_ha": potential_yield,
            "predicted_yield_tonnes_ha": round(predicted_yield, 2),
            "confidence_interval_tonnes_ha": (round(ci_min, 2), round(ci_max, 2)),
            "stress_penalties": penalties,
        }
