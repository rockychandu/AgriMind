from typing import Dict, Any

class BreakEvenCalculator:
    """Break-even Yield, Break-even Price, and Return on Investment (ROI) Calculator."""

    def compute_break_even_metrics(
        self,
        cost_per_ha: float,
        expected_yield_tonnes_ha: float,
        expected_price_per_tonne: float,
        area_ha: float
    ) -> Dict[str, Any]:
        total_costs = cost_per_ha * area_ha
        total_revenue = expected_yield_tonnes_ha * expected_price_per_tonne * area_ha
        net_profit = total_revenue - total_costs

        # Break-Even Yield (Y_BE = Total Costs / (Price * Area))
        be_yield = total_costs / max(1.0, (expected_price_per_tonne * area_ha))

        # Break-Even Price (P_BE = Total Costs / (Yield * Area))
        be_price = total_costs / max(0.1, (expected_yield_tonnes_ha * area_ha))

        roi_pct = (net_profit / max(1.0, total_costs)) * 100.0

        return {
            "total_expenses_usd": round(total_costs, 2),
            "total_expected_revenue_usd": round(total_revenue, 2),
            "net_profit_usd": round(net_profit, 2),
            "break_even_yield_tonnes_ha": round(be_yield, 2),
            "break_even_price_per_tonne": round(be_price, 2),
            "roi_percentage": round(roi_pct, 1),
            "profit_margin_percentage": round((net_profit / max(1.0, total_revenue)) * 100.0, 1),
        }
