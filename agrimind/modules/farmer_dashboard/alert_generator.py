from typing import List, Dict, Any

class AlertEngine:
    """Real-Time Agronomic Risk, Weather, and Task Alert Engine."""

    def generate_alerts(
        self,
        disease_risks: List[Dict[str, Any]],
        irrigation_tasks: List[Dict[str, Any]],
        soil_deficiencies: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        alerts = []

        for d in disease_risks:
            if d.get("risk_level") in ("High", "Extreme", "Critical"):
                alerts.append({
                    "severity": "CRITICAL",
                    "category": "Disease Outbreak Warning",
                    "message": f"High risk of {d.get('disease_name', 'pathogen')} in field {d.get('field_id')}.",
                    "action_required": "Apply preventative bio-control spray."
                })

        for i in irrigation_tasks:
            if i.get("needs_irrigation", False):
                alerts.append({
                    "severity": "WARNING",
                    "category": "Irrigation Depletion",
                    "message": f"Field {i.get('field_id')} soil moisture below MAD threshold.",
                    "action_required": f"Schedule {i.get('gross_irrigation_needed_mm', 15.0)} mm irrigation."
                })

        for s in soil_deficiencies:
            alerts.append({
                "severity": "INFO",
                "category": "Soil Nutrient Deficit",
                "message": f"Nutrient deficiency detected: {s.get('element')}.",
                "action_required": s.get("recommendation", "Apply soil amendment.")
            })

        return alerts
