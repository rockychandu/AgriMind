from typing import Dict, Any

class SoilWaterBalanceTracker:
    """Soil Root Zone Water Balance & Depletion Tracker."""

    def calculate_raw_taw(self, fc_vol: float, wp_vol: float, root_depth_m: float) -> float:
        return 1000.0 * (fc_vol - wp_vol) * root_depth_m

    def calculate_total_available_water_mm(self, field_capacity_vol: float, wilting_point_vol: float, root_depth_m: float) -> float:
        # TAW = 1000 * (FC - WP) * Zr
        taw_mm = 1000.0 * (field_capacity_vol - wilting_point_vol) * root_depth_m
        return round(taw_mm, 2)

    def calculate_readily_available_water_mm(self, taw_mm: float, mad_fraction: float = 0.50) -> float:
        # RAW = p * TAW
        raw_mm = taw_mm * mad_fraction
        return round(raw_mm, 2)

    def update_soil_water_depletion(
        self,
        current_depletion_mm: float,
        etc_mm: float,
        effective_rainfall_mm: float,
        irrigation_applied_mm: float,
        taw_mm: float
    ) -> Dict[str, Any]:
        # Depletion balance equation: D_t = D_{t-1} + ET_c - P_eff - I
        new_depletion = current_depletion_mm + etc_mm - effective_rainfall_mm - irrigation_applied_mm
        new_depletion = max(0.0, min(taw_mm, new_depletion))
        
        return {
            "current_depletion_mm": round(new_depletion, 2),
            "depletion_pct_of_taw": round((new_depletion / max(1.0, taw_mm)) * 100.0, 1),
            "needs_irrigation": new_depletion >= (taw_mm * 0.50),
        }
