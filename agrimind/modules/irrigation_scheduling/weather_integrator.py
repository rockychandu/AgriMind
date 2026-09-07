from typing import List, Dict, Any

class WeatherIntegrator:
    """Rainfall integration & effective precipitation model (USDA SCS Method)."""

    def compute_effective_rainfall_usda(self, total_precipitation_mm: float) -> float:
        if total_precipitation_mm <= 0:
            return 0.0
        elif total_precipitation_mm <= 250.0:
            eff = total_precipitation_mm * (125.0 - 0.2 * total_precipitation_mm) / 125.0
        else:
            eff = 125.0 + 0.1 * total_precipitation_mm
        return round(max(0.0, eff), 2)

    def process_forecast(self, raw_weather_records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        processed = []
        for r in raw_weather_records:
            precip = r.get("precipitation_mm", 0.0)
            eff_p = self.compute_effective_rainfall_usda(precip)
            processed.append({
                **r,
                "effective_precipitation_mm": eff_p
            })
        return processed
