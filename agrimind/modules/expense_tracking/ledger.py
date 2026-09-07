from typing import List, Dict, Any, Optional
from datetime import datetime
from agrimind.core.base_models import FarmExpenseEntry
from agrimind.core.domain_types import ExpenseCategory, Currency

class FarmExpenseLedger:
    """Multi-Field Farm Operational Financial Ledger Engine."""

    def __init__(self):
        self.entries: List[FarmExpenseEntry] = []

    def record_expense(
        self,
        field_id: str,
        crop_season_id: str,
        category: ExpenseCategory,
        description: str,
        quantity: float,
        unit: str,
        unit_price: float,
        currency: Currency = Currency.USD
    ) -> FarmExpenseEntry:
        total = quantity * unit_price
        entry = FarmExpenseEntry(
            entry_id=f"exp_{len(self.entries) + 1}_{int(datetime.utcnow().timestamp())}",
            field_id=field_id,
            crop_season_id=crop_season_id,
            timestamp=datetime.utcnow(),
            category=category,
            description=description,
            quantity=quantity,
            unit=unit,
            unit_price=unit_price,
            total_amount=total,
            currency=currency
        )
        self.entries.append(entry)
        return entry

    def get_total_expenses(self, field_id: Optional[str] = None) -> float:
        if field_id:
            return sum(e.total_amount for e in self.entries if e.field_id == field_id)
        return sum(e.total_amount for e in self.entries)

    def get_expenses_by_category(self, field_id: Optional[str] = None) -> Dict[str, float]:
        category_totals: Dict[str, float] = {}
        for e in self.entries:
            if field_id and e.field_id != field_id:
                continue
            cat_name = e.category.value
            category_totals[cat_name] = category_totals.get(cat_name, 0.0) + e.total_amount
        return {k: round(v, 2) for k, v in category_totals.items()}
