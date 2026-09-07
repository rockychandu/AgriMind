from typing import Dict, Tuple
from agrimind.core.domain_types import SoilType
from agrimind.core.exceptions import SoilAnalysisError

class SoilTextureAnalyzer:
    """USDA Soil Texture Triangle Classification Engine."""

    @staticmethod
    def classify_texture(sand: float, silt: float, clay: float) -> SoilType:
        total = sand + silt + clay
        if abs(total - 100.0) > 2.0:
            raise SoilAnalysisError(f"Sand ({sand}%), Silt ({silt}%), Clay ({clay}%) must sum to ~100% (got {total}%).")

        # USDA Soil Texture Triangle Classification Rules
        if clay >= 40.0:
            if sand >= 45.0:
                return SoilType.CLAY
            elif silt >= 40.0:
                return SoilType.CLAY
            else:
                return SoilType.CLAY
        elif clay >= 27.0 and clay < 40.0:
            if sand >= 45.0:
                return SoilType.CLAY_LOAM
            elif sand < 20.0:
                return SoilType.CLAY_LOAM
            else:
                return SoilType.CLAY_LOAM
        elif silt >= 50.0 and clay < 27.0:
            if silt >= 80.0 and clay < 12.0:
                return SoilType.SILTY
            else:
                return SoilType.SILT_LOAM
        elif sand >= 52.0 and clay < 20.0:
            if sand >= 85.0 and (silt + 1.5 * clay) < 15.0:
                return SoilType.SANDY
            else:
                return SoilType.SANDY_LOAM
        else:
            if clay >= 7.0 and clay <= 27.0 and silt >= 28.0 and silt < 50.0 and sand <= 52.0:
                return SoilType.LOAMY
            return SoilType.LOAMY

    @staticmethod
    def estimate_physical_properties(soil_type: SoilType) -> Dict[str, float]:
        properties = {
            SoilType.SANDY: {"field_capacity": 0.12, "wilting_point": 0.04, "available_water_capacity": 0.08, "infiltration_rate_mm_hr": 30.0},
            SoilType.SANDY_LOAM: {"field_capacity": 0.20, "wilting_point": 0.08, "available_water_capacity": 0.12, "infiltration_rate_mm_hr": 20.0},
            SoilType.LOAMY: {"field_capacity": 0.28, "wilting_point": 0.13, "available_water_capacity": 0.15, "infiltration_rate_mm_hr": 12.0},
            SoilType.SILT_LOAM: {"field_capacity": 0.32, "wilting_point": 0.14, "available_water_capacity": 0.18, "infiltration_rate_mm_hr": 10.0},
            SoilType.CLAY_LOAM: {"field_capacity": 0.34, "wilting_point": 0.19, "available_water_capacity": 0.15, "infiltration_rate_mm_hr": 5.0},
            SoilType.CLAY: {"field_capacity": 0.40, "wilting_point": 0.24, "available_water_capacity": 0.16, "infiltration_rate_mm_hr": 2.0},
            SoilType.BLACK_COTTON: {"field_capacity": 0.42, "wilting_point": 0.25, "available_water_capacity": 0.17, "infiltration_rate_mm_hr": 1.5},
            SoilType.RED_LATERITE: {"field_capacity": 0.25, "wilting_point": 0.12, "available_water_capacity": 0.13, "infiltration_rate_mm_hr": 15.0},
        }
        return properties.get(soil_type, {"field_capacity": 0.30, "wilting_point": 0.15, "available_water_capacity": 0.15, "infiltration_rate_mm_hr": 10.0})
