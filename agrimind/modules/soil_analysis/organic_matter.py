from typing import Dict, Any

class OrganicMatterAnalyzer:
    """Soil Organic Carbon (SOC), Soil Organic Matter (SOM), and Soil Health Index (SHI)."""

    def soc_to_som(self, soc_percentage: float) -> float:
        # Van Bemmelen conversion factor (SOM = SOC * 1.724)
        return round(soc_percentage * 1.724, 2)

    def evaluate_organic_matter_status(self, soc_percentage: float) -> Dict[str, Any]:
        som = self.soc_to_som(soc_percentage)
        if soc_percentage < 0.40:
            rating = "Very Low"
            recommendation = "Incorporate 15-20 tonnes/ha Farmyard Manure (FYM) or compost."
        elif soc_percentage < 0.75:
            rating = "Low"
            recommendation = "Apply 10-12 tonnes/ha compost and plant leguminous green manure crops."
        elif soc_percentage <= 1.20:
            rating = "Medium / Adequate"
            recommendation = "Maintain soil organic carbon with regular crop residue retention."
        else:
            rating = "High / Excellent"
            recommendation = "Optimal organic carbon level. Continue sustainable crop rotations."

        return {
            "soc_percentage": soc_percentage,
            "som_percentage": som,
            "rating": rating,
            "recommendation": recommendation,
        }

    def compute_soil_health_index(
        self,
        soc_pct: float,
        ph: float,
        ec_ds_m: float,
        n_ppm: float,
        p_ppm: float,
        k_ppm: float
    ) -> float:
        # Normalized 0-100 Soil Health Index
        score_soc = min(100.0, (soc_pct / 1.5) * 100.0) * 0.30
        
        if 6.0 <= ph <= 7.5:
            score_ph = 100.0 * 0.20
        else:
            score_ph = max(0.0, 100.0 - abs(ph - 6.8) * 25.0) * 0.20

        score_ec = max(0.0, 100.0 - ec_ds_m * 20.0) * 0.15
        score_n = min(100.0, (n_ppm / 50.0) * 100.0) * 0.12
        score_p = min(100.0, (p_ppm / 30.0) * 100.0) * 0.11
        score_k = min(100.0, (k_ppm / 200.0) * 100.0) * 0.12

        total_shi = score_soc + score_ph + score_ec + score_n + score_p + score_k
        return round(total_shi, 1)
