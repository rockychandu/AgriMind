from typing import Dict, Any
from agrimind.core.base_models import SoilSample, CropProfile
from agrimind.core.math_utils import clamp

class StressPenaltyCalculator:
    """Abiotic & Biotic Crop Yield Stress Penalty Reduction Engine."""

    def compute_stress_penalties(
        self,
        crop: CropProfile,
        soil: SoilSample,
        water_supplied_mm: float,
        mean_temperature_c: float,
        pest_disease_severity_score: float = 0.0
    ) -> Dict[str, float]:
        # 1. Water Stress Penalty (FAO Ky approach: 1 - Ya/Ym = Ky * (1 - ETa/ETm))
        water_ratio = min(1.0, water_supplied_mm / max(1.0, crop.water_requirement_mm))
        water_penalty_pct = max(0.0, (1.0 - water_ratio) * 1.1) * 100.0

        # 2. Temperature Stress Penalty
        if crop.optimal_temperature_min <= mean_temperature_c <= crop.optimal_temperature_max:
            temp_penalty_pct = 0.0
        else:
            diff = min(abs(mean_temperature_c - crop.optimal_temperature_min), abs(mean_temperature_c - crop.optimal_temperature_max))
            temp_penalty_pct = min(40.0, diff * 4.0)

        # 3. Salinity Stress Penalty (Maas-Hoffman equation)
        ec_e = soil.ec_ds_m
        if ec_e <= crop.salinity_tolerance_ec:
            salinity_penalty_pct = 0.0
        else:
            salinity_penalty_pct = min(60.0, (ec_e - crop.salinity_tolerance_ec) * 12.0)

        # 4. Pest / Disease Penalty
        disease_penalty_pct = clamp(pest_disease_severity_score * 25.0, 0.0, 50.0)

        total_penalty_pct = min(75.0, water_penalty_pct + temp_penalty_pct + salinity_penalty_pct + disease_penalty_pct)

        return {
            "water_stress_penalty_pct": round(water_penalty_pct, 1),
            "temperature_stress_penalty_pct": round(temp_penalty_pct, 1),
            "salinity_stress_penalty_pct": round(salinity_penalty_pct, 1),
            "disease_stress_penalty_pct": round(disease_penalty_pct, 1),
            "total_yield_penalty_pct": round(total_penalty_pct, 1),
            "yield_retained_factor": round(1.0 - (total_penalty_pct / 100.0), 3),
        }
