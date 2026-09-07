from typing import Dict, Any

class CationExchangeAnalyzer:
    """Cation Exchange Capacity (CEC), Base Saturation %, and Ca:Mg:K ratio analyzer."""

    def evaluate_cec(self, cec_meq_100g: float) -> Dict[str, Any]:
        if cec_meq_100g < 10.0:
            rating = "Low CEC (Sandy / Highly Leached)"
            behavior = "Low nutrient holding capacity; requires frequent split fertilizer applications."
        elif cec_meq_100g <= 25.0:
            rating = "Moderate CEC (Loamy / Silt Loam)"
            behavior = "Good balance of nutrient retention and availability."
        else:
            rating = "High CEC (Clay / Vertisol)"
            behavior = "High cation holding capacity; retains applied fertilizers well."

        return {
            "cec_meq_100g": cec_meq_100g,
            "rating": rating,
            "agronomic_behavior": behavior,
        }

    def calculate_base_saturation(
        self,
        ca_ppm: float,
        mg_ppm: float,
        k_ppm: float,
        cec_meq_100g: float
    ) -> Dict[str, Any]:
        # Convert ppm to meq/100g: Ca / 200, Mg / 120, K / 390
        ca_meq = ca_ppm / 200.0
        mg_meq = mg_ppm / 120.0
        k_meq = k_ppm / 390.0
        
        sum_base_cations = ca_meq + mg_meq + k_meq
        base_saturation_pct = min(100.0, (sum_base_cations / max(0.1, cec_meq_100g)) * 100.0)

        ca_ratio = (ca_meq / max(0.01, sum_base_cations)) * 100.0
        mg_ratio = (mg_meq / max(0.01, sum_base_cations)) * 100.0
        k_ratio = (k_meq / max(0.01, sum_base_cations)) * 100.0

        return {
            "base_saturation_pct": round(base_saturation_pct, 1),
            "ca_pct_of_bases": round(ca_ratio, 1),
            "mg_pct_of_bases": round(mg_ratio, 1),
            "k_pct_of_bases": round(k_ratio, 1),
            "optimal_ca_range": "65-75%",
            "optimal_mg_range": "10-20%",
            "optimal_k_range": "3-7%",
        }
