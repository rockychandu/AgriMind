from typing import Dict, Any

class ExecutiveMetricsCalculator:
    """Executive KPI Metrics Calculator for Agricultural Enterprise Management."""

    def compute_farm_kpis(
        self,
        total_revenue: float,
        total_cost: float,
        total_area_ha: float,
        water_used_m3: float
    ) -> Dict[str, Any]:
        profit = total_revenue - total_cost
        margin = (profit / max(1.0, total_revenue)) * 100.0
        profit_per_ha = profit / max(0.1, total_area_ha)
        water_productivity = total_revenue / max(1.0, water_used_m3) # USD per m3 water

        return {
            "net_profit_margin_pct": round(margin, 1),
            "profit_per_hectare_usd": round(profit_per_ha, 2),
            "water_economic_productivity_usd_m3": round(water_productivity, 2),
        }
