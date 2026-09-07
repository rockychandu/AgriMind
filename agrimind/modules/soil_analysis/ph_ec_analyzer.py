from typing import Dict, Any
from agrimind.core.base_models import SoilSample

class PhEcAnalyzer:
    """Soil pH buffering, amendment requirements (lime/sulfur), and EC salinity hazard index."""

    def evaluate_ph_condition(self, ph: float) -> Dict[str, Any]:
        if ph < 5.5:
            condition = "Strongly Acidic"
            amendment = "Agricultural Lime (CaCO3)"
            impact = "Aluminum/Manganese toxicity, phosphorus fixation, low nitrogen availability."
        elif ph < 6.0:
            condition = "Moderately Acidic"
            amendment = "Light Lime application or Dolomite"
            impact = "Slight reduced availability of calcium and phosphorus."
        elif ph <= 7.5:
            condition = "Optimal / Neutral"
            amendment = "None required"
            impact = "Maximum availability of essential plant macro and micro-nutrients."
        elif ph <= 8.2:
            condition = "Slightly Alkaline"
            amendment = "Organic compost / Sulfur treatment"
            impact = "Micro-nutrient fixations (Iron, Zinc, Manganese)."
        else:
            condition = "Strongly Alkaline / Sodic"
            amendment = "Gypsum (CaSO4.2H2O) + Elemental Sulfur"
            impact = "Severe micro-nutrient deficiencies and soil dispersion."

        return {
            "ph": ph,
            "condition": condition,
            "recommended_amendment": amendment,
            "agronomic_impact": impact,
        }

    def calculate_lime_requirement_kg_ha(self, current_ph: float, target_ph: float = 6.5, clay_pct: float = 20.0) -> float:
        if current_ph >= target_ph:
            return 0.0
        delta = target_ph - current_ph
        # Buffering capacity multiplier based on soil texture clay content
        buffer_factor = 1200.0 + (clay_pct * 40.0)
        lime_kg_ha = delta * buffer_factor
        return round(lime_kg_ha, 2)

    def calculate_gypsum_requirement_kg_ha(self, ph: float, ec_ds_m: float) -> float:
        if ph > 8.2 and ec_ds_m > 4.0:
            # Sodic/Saline-sodic soil reclamation requirement
            return round((ph - 8.0) * 2500.0, 2)
        return 0.0

    def evaluate_salinity_hazard(self, ec_ds_m: float) -> Dict[str, Any]:
        if ec_ds_m < 1.0:
            level = "Non-Saline"
            crop_impact = "Negligible osmotic stress."
        elif ec_ds_m <= 2.5:
            level = "Slightly Saline"
            crop_impact = "Sensitive crops (onion, beans, fruits) show mild yield reduction."
        elif ec_ds_m <= 4.0:
            level = "Moderately Saline"
            crop_impact = "Yield reduction in standard crops; select tolerant varieties."
        else:
            level = "Severely Saline"
            crop_impact = "Severe osmotic stress; requires leaching fraction irrigation & drainage."

        return {
            "ec_ds_m": ec_ds_m,
            "salinity_level": level,
            "impact_description": crop_impact,
        }
