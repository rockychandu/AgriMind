from typing import List, Tuple, Dict
from agrimind.core.math_utils import calculate_gdd

class ThermalUnitCalculator:
    def __init__(self, default_t_cutoff: float = 30.0):
        self.default_t_cutoff = default_t_cutoff

    def calculate_daily_gdd(self, t_max: float, t_min: float, t_base: float, t_cutoff: float = None) -> float:
        cutoff = t_cutoff if t_cutoff is not None else self.default_t_cutoff
        return calculate_gdd(t_max, t_min, t_base, cutoff)

    def calculate_accumulated_gdd(
        self,
        daily_temps: List[Tuple[float, float]],
        t_base: float,
        t_cutoff: float = None
    ) -> float:
        total_gdd = 0.0
        for t_max, t_min in daily_temps:
            total_gdd += self.calculate_daily_gdd(t_max, t_min, t_base, t_cutoff)
        return total_gdd

    def estimate_maturity_days(
        self,
        target_gdd: float,
        daily_temp_forecast: List[Tuple[float, float]],
        t_base: float,
        t_cutoff: float = None
    ) -> int:
        accumulated = 0.0
        days = 0
        for t_max, t_min in daily_temp_forecast:
            days += 1
            accumulated += self.calculate_daily_gdd(t_max, t_min, t_base, t_cutoff)
            if accumulated >= target_gdd:
                return days

        # Extrapolate if forecast is shorter than target maturity
        if days > 0 and accumulated > 0:
            avg_gdd_per_day = accumulated / days
            remaining_gdd = max(0.0, target_gdd - accumulated)
            days += int(remaining_gdd / avg_gdd_per_day) + 1
        return max(1, days)
