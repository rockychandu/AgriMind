from typing import List, Dict, Any
from agrimind.core.math_utils import calculate_mean_and_std

class HistoricTrendAnalyzer:
    """Multi-Season Historic Yield Trend & Variance Analyzer."""

    def analyze_season_history(self, historic_yields_tonnes_ha: List[float]) -> Dict[str, Any]:
        if not historic_yields_tonnes_ha:
            return {"mean_yield": 0.0, "trend": "No Data"}

        mean_y, std_y = calculate_mean_and_std(historic_yields_tonnes_ha)
        cv_pct = (std_y / mean_y * 100.0) if mean_y > 0 else 0.0

        if len(historic_yields_tonnes_ha) >= 2:
            first_half = sum(historic_yields_tonnes_ha[:len(historic_yields_tonnes_ha)//2])
            second_half = sum(historic_yields_tonnes_ha[len(historic_yields_tonnes_ha)//2:])
            trend = "Increasing" if second_half > first_half else ("Decreasing" if second_half < first_half else "Stable")
        else:
            trend = "Insufficient Data"

        return {
            "mean_yield_tonnes_ha": round(mean_y, 2),
            "std_deviation": round(std_y, 2),
            "coefficient_of_variation_pct": round(cv_pct, 1),
            "historical_yield_trend": trend,
            "seasons_analyzed": len(historic_yields_tonnes_ha),
        }
