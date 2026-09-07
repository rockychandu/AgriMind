from typing import List, Dict, Any
from agrimind.modules.disease_detection.symptom_bayes_net import BayesianDiagnosticNetwork
from agrimind.modules.disease_detection.image_feature_extractor import ImageFeatureExtractor
from agrimind.modules.disease_detection.disease_forecaster import MicroclimateDiseaseForecaster

class DiseaseDiagnosticEngine:
    """Multi-Modal Disease Diagnostic Engine."""

    def __init__(self):
        self.bayes_net = BayesianDiagnosticNetwork()
        self.feature_extractor = ImageFeatureExtractor()
        self.forecaster = MicroclimateDiseaseForecaster()

    def perform_diagnosis(
        self,
        crop_id: str,
        observed_symptoms: List[str],
        temperature_c: float = 24.0,
        humidity_pct: float = 80.0,
        leaf_wetness_hours: float = 8.0,
        image_metadata: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        symptoms = list(observed_symptoms)

        if image_metadata:
            extracted = self.feature_extractor.analyze_image_bytes(image_metadata)
            symptoms.extend(extracted.get("detected_symptom_features", []))

        matches = self.bayes_net.diagnose_from_symptoms(
            crop_id=crop_id,
            observed_symptoms=symptoms,
            temperature_c=temperature_c,
            humidity_pct=humidity_pct
        )

        risk_forecast = self.forecaster.forecast_disease_risk(
            crop_id=crop_id,
            avg_temp_c=temperature_c,
            relative_humidity_pct=humidity_pct,
            leaf_wetness_hours=leaf_wetness_hours
        )

        top_match = matches[0] if matches else None

        return {
            "crop_id": crop_id,
            "primary_diagnosis": top_match["common_name"] if top_match else "Unconfirmed / Environmental Stress",
            "scientific_name": top_match["scientific_name"] if top_match else "N/A",
            "confidence_score": top_match["confidence_score"] if top_match else 0.0,
            "all_potential_pathogens": matches,
            "microclimate_risk_forecast": risk_forecast,
        }
