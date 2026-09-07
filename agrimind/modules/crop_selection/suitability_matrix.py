from typing import Dict, List, Tuple
from agrimind.core.base_models import CropProfile, SoilSample
from agrimind.core.domain_types import SoilType
from agrimind.core.math_utils import clamp

class SuitabilityMatrixEngine:
    def __init__(self):
        self.weights = {
            "ph": 0.25,
            "salinity": 0.20,
            "soil_type": 0.20,
            "water": 0.20,
            "temperature": 0.15
        }

    def evaluate_ph_suitability(self, soil_ph: float, crop: CropProfile) -> float:
        if crop.optimal_ph_min <= soil_ph <= crop.optimal_ph_max:
            return 1.0
        if crop.min_ph <= soil_ph <= crop.max_ph:
            if soil_ph < crop.optimal_ph_min:
                return clamp(1.0 - (crop.optimal_ph_min - soil_ph) / (crop.optimal_ph_min - crop.min_ph), 0.2, 0.99)
            else:
                return clamp(1.0 - (soil_ph - crop.optimal_ph_max) / (crop.max_ph - crop.optimal_ph_max), 0.2, 0.99)
        return 0.05

    def evaluate_salinity_suitability(self, soil_ec: float, crop: CropProfile) -> float:
        if soil_ec <= crop.salinity_tolerance_ec:
            return 1.0
        excess_ec = soil_ec - crop.salinity_tolerance_ec
        penalty = excess_ec * 0.25
        return clamp(1.0 - penalty, 0.05, 0.95)

    def evaluate_soil_type_suitability(self, soil_type: SoilType, crop: CropProfile) -> float:
        if not crop.suitable_soil_types:
            return 0.80
        if soil_type in crop.suitable_soil_types:
            return 1.0
        return 0.40

    def evaluate_water_suitability(self, available_water_mm: float, crop: CropProfile) -> float:
        ratio = available_water_mm / max(1.0, crop.water_requirement_mm)
        if ratio >= 1.0:
            return 1.0
        if ratio >= 0.7:
            return clamp(ratio, 0.7, 0.99)
        return clamp(ratio * 0.8, 0.1, 0.7)

    def evaluate_temp_suitability(self, mean_temp_c: float, crop: CropProfile) -> float:
        if crop.optimal_temperature_min <= mean_temp_c <= crop.optimal_temperature_max:
            return 1.0
        if mean_temp_c < crop.optimal_temperature_min:
            diff = crop.optimal_temperature_min - mean_temp_c
            return clamp(1.0 - diff * 0.08, 0.1, 0.9)
        else:
            diff = mean_temp_c - crop.optimal_temperature_max
            return clamp(1.0 - diff * 0.10, 0.1, 0.9)

    def compute_composite_score(
        self,
        crop: CropProfile,
        soil: SoilSample,
        available_water_mm: float,
        mean_temp_c: float
    ) -> Dict[str, float]:
        s_ph = self.evaluate_ph_suitability(soil.ph, crop)
        s_ec = self.evaluate_salinity_suitability(soil.ec_ds_m, crop)
        s_soil = self.evaluate_soil_type_suitability(soil.soil_type, crop)
        s_water = self.evaluate_water_suitability(available_water_mm, crop)
        s_temp = self.evaluate_temp_suitability(mean_temp_c, crop)

        composite = (
            s_ph * self.weights["ph"] +
            s_ec * self.weights["salinity"] +
            s_soil * self.weights["soil_type"] +
            s_water * self.weights["water"] +
            s_temp * self.weights["temperature"]
        )

        return {
            "composite_score": round(composite, 4),
            "ph_score": round(s_ph, 2),
            "salinity_score": round(s_ec, 2),
            "soil_type_score": round(s_soil, 2),
            "water_score": round(s_water, 2),
            "temperature_score": round(s_temp, 2),
        }
