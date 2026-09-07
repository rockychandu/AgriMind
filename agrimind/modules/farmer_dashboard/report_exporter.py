from typing import Dict, Any

class AdvisoryReportExporter:
    """Actionable Farmer Advisory Report Generator."""

    def format_text_report(self, dashboard_data: Dict[str, Any]) -> str:
        lines = [
            "============================================================",
            "             AGRIMIND FARMER ADVISORY REPORT                ",
            "============================================================",
            f"Farmer Name : {dashboard_data.get('farmer_name', 'N/A')}",
            f"Region      : {dashboard_data.get('region', 'N/A')}",
            f"Date        : {dashboard_data.get('timestamp', '')[:10]}",
            "------------------------------------------------------------",
            "FARM SUMMARY:",
            f"  Total Fields        : {dashboard_data.get('total_fields', 0)}",
            f"  Total Area          : {dashboard_data.get('total_area_hectares', 0)} ha",
            f"  Active Crops        : {', '.join(dashboard_data.get('active_crops', []))}",
            "------------------------------------------------------------",
            "FINANCIAL PERFORMANCE PROJECTION:",
            f"  Projected Revenue   : ${dashboard_data.get('financial_summary', {}).get('total_projected_revenue_usd', 0):,.2f}",
            f"  Total Expenses      : ${dashboard_data.get('financial_summary', {}).get('total_expenses_usd', 0):,.2f}",
            f"  Net Profit          : ${dashboard_data.get('financial_summary', {}).get('net_projected_profit_usd', 0):,.2f}",
            f"  ROI                 : {dashboard_data.get('financial_summary', {}).get('roi_percentage', 0)}%",
            "------------------------------------------------------------",
            "ACTIVE ALERTS & RECOMMENDATIONS:",
        ]

        alerts = dashboard_data.get("alerts", [])
        if not alerts:
            lines.append("  No urgent alerts. Farm condition is optimal.")
        else:
            for idx, a in enumerate(alerts, 1):
                lines.append(f"  [{idx}] ({a.get('severity')}) {a.get('category')}: {a.get('message')}")
                lines.append(f"      Action: {a.get('action_required')}")

        lines.append("============================================================")
        return "\n".join(lines)
