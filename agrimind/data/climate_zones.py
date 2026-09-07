from typing import Dict, List
from agrimind.core.domain_types import ClimateZone

CLIMATE_ZONE_PROFILES: Dict[ClimateZone, Dict[str, any]] = {
    ClimateZone.TROPICAL_WET: {
        "annual_rainfall_mm": 2200.0,
        "mean_temp_c": 27.5,
        "humidity_avg_pct": 82.0,
        "et0_daily_avg_mm": 4.2,
        "solar_rad_mj_m2": 19.5,
        "dominant_crops": ["rice_indica", "banana_cavendish", "sugarcane_hybrid", "tea_assam"],
    },
    ClimateZone.TROPICAL_DRY: {
        "annual_rainfall_mm": 850.0,
        "mean_temp_c": 28.0,
        "humidity_avg_pct": 62.0,
        "et0_daily_avg_mm": 5.8,
        "solar_rad_mj_m2": 22.0,
        "dominant_crops": ["cotton_bt", "sorghum_grain", "peanut_runner", "turmeric_curcuma"],
    },
    ClimateZone.SEMI_ARID: {
        "annual_rainfall_mm": 450.0,
        "mean_temp_c": 26.0,
        "humidity_avg_pct": 48.0,
        "et0_daily_avg_mm": 6.5,
        "solar_rad_mj_m2": 24.5,
        "dominant_crops": ["millet_pearl", "chickpea_kabuli", "mustard_indian", "ashwagandha_medicinal"],
    },
    ClimateZone.TEMPERATE: {
        "annual_rainfall_mm": 750.0,
        "mean_temp_c": 14.5,
        "humidity_avg_pct": 68.0,
        "et0_daily_avg_mm": 3.2,
        "solar_rad_mj_m2": 16.0,
        "dominant_crops": ["wheat_bread", "barley_malting", "apple_fuji", "potato_table"],
    },
    ClimateZone.HUMID_SUBTROPICAL: {
        "annual_rainfall_mm": 1150.0,
        "mean_temp_c": 22.0,
        "humidity_avg_pct": 74.0,
        "et0_daily_avg_mm": 4.8,
        "solar_rad_mj_m2": 20.5,
        "dominant_crops": ["wheat_bread", "rice_basmati", "maize_field", "soybean_grain", "tomato_hybrid"],
    },
}
