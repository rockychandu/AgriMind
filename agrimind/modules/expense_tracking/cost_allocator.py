from typing import Dict, Any, List
from agrimind.modules.expense_tracking.ledger import FarmExpenseLedger

class CostAllocator:
    """Activity-Based Costing (ABC) per Field Plot and Crop Cycle."""

    def compute_cost_per_hectare(self, ledger: FarmExpenseLedger, field_id: str, field_area_ha: float) -> Dict[str, Any]:
        total_field_exp = ledger.get_total_expenses(field_id=field_id)
        cost_per_ha = total_field_exp / max(0.1, field_area_ha)

        cat_breakdown = ledger.get_expenses_by_category(field_id=field_id)
        cat_per_ha = {cat: round(amt / max(0.1, field_area_ha), 2) for cat, amt in cat_breakdown.items()}

        return {
            "field_id": field_id,
            "field_area_ha": field_area_ha,
            "total_expenses_usd": round(total_field_exp, 2),
            "cost_per_hectare_usd": round(cost_per_ha, 2),
            "category_breakdown_per_ha": cat_per_ha,
        }
