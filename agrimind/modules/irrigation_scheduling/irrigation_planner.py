from typing import List, Dict, Any
from agrimind.core.base_models import CropProfile
from agrimind.core.domain_types import IrrType
from agrimind.modules.irrigation_scheduling.evapotranspiration_fao56 import FAO56EvapotranspirationEngine
from agrimind.modules.irrigation_scheduling.crop_kc_curves import CropKcCurveGenerator

class IrrigationPlanner:
    """Irrigation system runtime, water volume, and cost scheduler."""

    def __init__(self):
        self.et_engine = FAO56EvapotranspirationEngine()
        self.kc_gen = CropKcCurveGenerator()

    def generate_irrigation_schedule(
        self,
        crop: CropProfile,
        area_ha: float,
        daily_weather_forecast: List[Dict[str, float]],
        irr_type: IrrType = IrrType.DRIP
    ) -> Dict[str, Any]:
        schedule = []
        total_water_m3 = 0.0

        efficiency = 0.90 if irr_type == IrrType.DRIP else (0.75 if irr_type == IrrType.SPRINKLER else 0.60)

        for day_idx, w in enumerate(daily_weather_forecast):
            day_num = day_idx + 1
            et0 = self.et_engine.compute_daily_et0(
                temp_min_c=w.get("t_min", 18.0),
                temp_max_c=w.get("t_max", 30.0),
                humidity_pct=w.get("rh", 65.0),
                wind_speed_m_s=w.get("wind", 2.0),
                solar_rad_mj_m2=w.get("solar", 20.0)
            )

            kc = self.kc_gen.get_kc_value(day_num, crop)
            etc_mm = self.et_engine.compute_crop_evapotranspiration(et0, kc)

            rainfall_mm = w.get("rainfall_mm", 0.0)
            eff_rain_mm = max(0.0, (rainfall_mm - 5.0) * 0.8) if rainfall_mm > 5.0 else 0.0

            net_irr_mm = max(0.0, etc_mm - eff_rain_mm)
            gross_irr_mm = net_irr_mm / efficiency

            water_m3 = (gross_irr_mm * 10.0) * area_ha
            total_water_m3 += water_m3

            # System run time estimation (e.g. drip flow rate 10 m3/hr/ha)
            runtime_hours = water_m3 / max(1.0, (10.0 * area_ha))

            schedule.append({
                "day": day_num,
                "et0_mm": et0,
                "kc": round(kc, 2),
                "etc_mm": etc_mm,
                "effective_rainfall_mm": round(eff_rain_mm, 1),
                "gross_irrigation_needed_mm": round(gross_irr_mm, 2),
                "water_volume_m3": round(water_m3, 2),
                "recommended_runtime_hours": round(runtime_hours, 2),
            })

        water_cost_usd = total_water_m3 * 0.15

        return {
            "crop_id": crop.crop_id,
            "crop_name": crop.name,
            "area_hectares": area_ha,
            "irrigation_type": irr_type.value,
            "system_efficiency_pct": round(efficiency * 100.0, 1),
            "total_water_volume_m3": round(total_water_m3, 2),
            "estimated_water_cost_usd": round(water_cost_usd, 2),
            "daily_schedule": schedule,
        }
