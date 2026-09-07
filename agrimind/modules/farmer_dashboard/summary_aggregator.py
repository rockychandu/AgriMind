from typing import List, Dict, Any
from datetime import datetime
from agrimind.core.base_models import FarmerProfile, FieldPlot

class DashboardAggregator:
    """Executive Dashboard Aggregator for Multi-Field Farms."""

    def compile_dashboard_summary(
        self,
        farmer: FarmerProfile,
        expenses_by_field: Dict[str, float],
        revenues_by_field: Dict[str, float],
        active_alerts: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        total_area = sum(f.area_hectares for f in farmer.fields)
        total_exp = sum(expenses_by_field.values())
        total_rev = sum(revenues_by_field.values())
        total_profit = total_rev - total_exp

        crops = list(set(f.current_crop_id for f in farmer.fields if f.current_crop_id))

        return {
            "farmer_id": farmer.farmer_id,
            "farmer_name": farmer.name,
            "region": farmer.region,
            "timestamp": datetime.utcnow().isoformat(),
            "total_fields": len(farmer.fields),
            "total_area_hectares": round(total_area, 2),
            "active_crops": crops,
            "financial_summary": {
                "total_expenses_usd": round(total_exp, 2),
                "total_projected_revenue_usd": round(total_rev, 2),
                "net_projected_profit_usd": round(total_profit, 2),
                "roi_percentage": round((total_profit / max(1.0, total_exp)) * 100.0, 1),
            },
            "alerts": active_alerts,
        }
