from typing import List, Dict, Any
from agrimind.core.base_models import SoilSample

class MicronutrientEngine:
    """Micronutrient deficiency corrections and secondary nutrient amendments."""

    def evaluate_micronutrients(self, soil: SoilSample) -> List[Dict[str, Any]]:
        corrections = []

        if soil.zinc_ppm < 0.8:
            corrections.append({
                "element": "Zinc (Zn)",
                "status": "Deficient",
                "recommendation": "Soil apply Zinc Sulfate Monohydrate (33% Zn) @ 25 kg/ha or foliar spray 0.5% ZnSO4 + 0.25% Lime.",
                "cost_per_ha": 45.0
            })

        if soil.iron_ppm < 5.0:
            corrections.append({
                "element": "Iron (Fe)",
                "status": "Deficient",
                "recommendation": "Foliar spray Ferrous Sulfate (FeSO4 19%) @ 1.0% solution twice at 15-day intervals.",
                "cost_per_ha": 30.0
            })

        if soil.boron_ppm < 0.5:
            corrections.append({
                "element": "Boron (B)",
                "status": "Deficient",
                "recommendation": "Soil apply Borax (10.5% B) @ 10 kg/ha or foliar spray Solubor (20% B) @ 0.1%.",
                "cost_per_ha": 25.0
            })

        return corrections
