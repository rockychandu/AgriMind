from typing import List, Dict, Any

class SaltIndexEvaluator:
    """Salt Index Safety & Fertilizer Seed Burn Hazard Evaluator."""

    def evaluate_salt_hazard(self, fertilizer_blend: List[Dict[str, Any]]) -> Dict[str, Any]:
        high_salt = False
        hazard_warnings = []

        for item in fertilizer_blend:
            pname = item["product_name"]
            rate = item["rate_kg_ha"]
            if "MOP" in pname and rate > 150.0:
                high_salt = True
                hazard_warnings.append("High Muriate of Potash (MOP) dosage poses root salt burn risk. Split or switch to SOP for sensitive seedlings.")
            if "Urea" in pname and rate > 100.0:
                hazard_warnings.append("Avoid direct seed contact with heavy Urea applications; maintain >5 cm offset.")

        return {
            "has_salt_burn_hazard": high_salt,
            "warnings": hazard_warnings,
            "safety_guideline": "Maintain seed-to-fertilizer physical spacing of 5 cm laterally and 5 cm below seed depth."
        }
