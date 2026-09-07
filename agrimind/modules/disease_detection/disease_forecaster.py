from typing import List, Dict, Any
from agrimind.core.domain_types import RiskLevel

class MicroclimateDiseaseForecaster:
    """Weather-driven fungal & bacterial microclimate disease risk forecaster."""

    def forecast_disease_risk(
        self,
        crop_id: str,
        avg_temp_c: float,
        relative_humidity_pct: float,
        leaf_wetness_hours: float
    ) -> Dict[str, Any]:
        risk_score = 0.0

        if relative_humidity_pct >= 85.0:
            risk_score += 0.40
        elif relative_humidity_pct >= 70.0:
            risk_score += 0.20

        if leaf_wetness_hours >= 10.0:
            risk_score += 0.40
        elif leaf_wetness_hours >= 6.0:
            risk_score += 0.20

        if 18.0 <= avg_temp_c <= 28.0:
            risk_score += 0.20

        level = RiskLevel.EXTREME if risk_score >= 0.85 else (
            RiskLevel.HIGH if risk_score >= 0.65 else (
                RiskLevel.MODERATE if risk_score >= 0.40 else RiskLevel.LOW
            )
        )

        recommendations = []
        if level in (RiskLevel.HIGH, RiskLevel.EXTREME):
            recommendations.append("Apply preventative bio-fungicide (Trichoderma / Bacillus subtilis).")
            recommendations.append("Reduce canopy humidity by widening planting spacing or pruning lower leaves.")
        else:
            recommendations.append("Continue regular scouting and monitor weather alerts.")

        return {
            "crop_id": crop_id,
            "pathogen_risk_score": round(risk_score, 2),
            "risk_level": level.value,
            "trigger_factors": {
                "high_humidity": relative_humidity_pct >= 70.0,
                "extended_leaf_wetness": leaf_wetness_hours >= 6.0,
                "favorable_temperature": 18.0 <= avg_temp_c <= 28.0
            },
            "recommended_actions": recommendations,
        }
