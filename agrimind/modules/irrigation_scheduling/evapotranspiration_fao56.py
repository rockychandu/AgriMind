from agrimind.core.math_utils import calculate_fao56_penman_monteith_et0

class FAO56EvapotranspirationEngine:
    """FAO-56 Penman-Monteith Reference Evapotranspiration (ET0) Engine."""

    def compute_daily_et0(
        self,
        temp_min_c: float,
        temp_max_c: float,
        humidity_pct: float,
        wind_speed_m_s: float,
        solar_rad_mj_m2: float,
        elevation_m: float = 100.0
    ) -> float:
        et0 = calculate_fao56_penman_monteith_et0(
            temp_min_c=temp_min_c,
            temp_max_c=temp_max_c,
            rh_mean_pct=humidity_pct,
            wind_speed_2m_ms=wind_speed_m_s,
            solar_radiation_mj_m2_day=solar_rad_mj_m2,
            elevation_m=elevation_m
        )
        return round(et0, 2)

    def compute_crop_evapotranspiration(self, et0_mm_day: float, kc_value: float) -> float:
        return round(et0_mm_day * kc_value, 2)
