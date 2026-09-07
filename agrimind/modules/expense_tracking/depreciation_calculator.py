from typing import Dict, Any

class MachineryDepreciationCalculator:
    """Farm Equipment Depreciation Calculator (Straight-Line & Declining Balance)."""

    def compute_straight_line_depreciation(
        self,
        initial_cost: float,
        salvage_value: float,
        useful_life_years: int
    ) -> Dict[str, Any]:
        annual_deprec = (initial_cost - salvage_value) / max(1, useful_life_years)
        return {
            "initial_cost": initial_cost,
            "salvage_value": salvage_value,
            "useful_life_years": useful_life_years,
            "annual_depreciation_usd": round(annual_deprec, 2),
            "monthly_depreciation_usd": round(annual_deprec / 12.0, 2),
        }

    def compute_declining_balance_depreciation(
        self,
        initial_cost: float,
        rate_percentage: float,
        years: int
    ) -> Dict[str, Any]:
        schedule = []
        current_val = initial_cost
        for yr in range(1, years + 1):
            deprec = current_val * (rate_percentage / 100.0)
            end_val = current_val - deprec
            schedule.append({
                "year": yr,
                "starting_value": round(current_val, 2),
                "depreciation": round(deprec, 2),
                "ending_value": round(end_val, 2)
            })
            current_val = end_val

        return {
            "initial_cost": initial_cost,
            "depreciation_schedule": schedule,
        }
