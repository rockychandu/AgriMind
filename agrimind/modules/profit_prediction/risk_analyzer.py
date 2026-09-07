from typing import Dict, Any

class ProfitRiskAnalyzer:
    """Financial Risk Assessment and Downside Price Sensitivity Analyzer."""

    def evaluate_downside_sensitivity(
        self,
        cost_per_ha: float,
        expected_yield_ha: float,
        base_price_tonne: float
    ) -> Dict[str, Any]:
        price_drop_10 = base_price_tonne * 0.90
        price_drop_20 = base_price_tonne * 0.80

        profit_base = (expected_yield_ha * base_price_tonne) - cost_per_ha
        profit_10 = (expected_yield_ha * price_drop_10) - cost_per_ha
        profit_20 = (expected_yield_ha * price_drop_20) - cost_per_ha

        return {
            "base_profit_per_ha": round(profit_base, 2),
            "profit_at_10pct_price_drop": round(profit_10, 2),
            "profit_at_20pct_price_drop": round(profit_20, 2),
            "downside_cushion_percentage": round(((base_price_tonne - (cost_per_ha / max(0.1, expected_yield_ha))) / base_price_tonne) * 100.0, 1)
        }
