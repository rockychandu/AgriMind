from typing import List, Dict, Any
from agrimind.core.base_models import PathogenInfo
from agrimind.core.domain_types import DiseaseSeverity, RiskLevel
from agrimind.data import ALL_DISEASES

class BayesianDiagnosticNetwork:
    """Probabilistic Bayesian Network for Plant Pathology Diagnosis."""

    def __init__(self, kb: Dict[str, PathogenInfo] = None):
        self.kb = kb or ALL_DISEASES

    def diagnose_from_symptoms(
        self,
        crop_id: str,
        observed_symptoms: List[str],
        temperature_c: float = 24.0,
        humidity_pct: float = 80.0
    ) -> List[Dict[str, Any]]:
        results = []

        for disease_id, pathogen in self.kb.items():
            if crop_id not in pathogen.host_crops and "all" not in pathogen.host_crops:
                continue

            # Symptom match likelihood
            matching_symptoms = [s for s in observed_symptoms if any(ms in s or s in ms for ms in pathogen.symptoms)]
            if not matching_symptoms:
                continue

            symptom_prior = len(matching_symptoms) / max(1, len(pathogen.symptoms))

            # Weather likelihood factor P(Weather | Disease)
            weather_factor = 1.0
            if pathogen.favorable_temp_min <= temperature_c <= pathogen.favorable_temp_max:
                weather_factor *= 1.3
            else:
                weather_factor *= 0.6

            if humidity_pct >= pathogen.favorable_humidity_min:
                weather_factor *= 1.4
            else:
                weather_factor *= 0.5

            posterior_score = min(0.99, symptom_prior * weather_factor)

            if posterior_score > 0.15:
                risk = RiskLevel.CRITICAL if posterior_score > 0.80 else (
                    RiskLevel.HIGH if posterior_score > 0.60 else RiskLevel.MODERATE
                )

                results.append({
                    "disease_id": pathogen.pathogen_id,
                    "common_name": pathogen.common_name,
                    "scientific_name": pathogen.scientific_name,
                    "pathogen_type": pathogen.pathogen_type.value,
                    "confidence_score": round(posterior_score, 4),
                    "confidence_percentage": round(posterior_score * 100.0, 1),
                    "risk_level": risk.value,
                    "matched_symptoms": matching_symptoms,
                    "chemical_treatments": pathogen.chemical_treatment,
                    "organic_treatments": pathogen.organic_treatment,
                    "preventative_measures": pathogen.preventative_measures,
                })

        results.sort(key=lambda x: x["confidence_score"], reverse=True)
        return results
