from agrimind.core.base_models import CropProfile
from agrimind.core.domain_types import GrowthStage

class CropKcCurveGenerator:
    """Crop Coefficient (Kc) Phenological Curve Generator."""

    def get_stage_and_kc(self, current_day: int, crop: CropProfile) -> float:
        return self.get_kc_value(current_day, crop)

    def get_kc_value(self, current_day: int, crop: CropProfile) -> float:
        total_days = (crop.min_growth_days + crop.max_growth_days) // 2
        d_init = int(total_days * 0.15)
        d_dev = int(total_days * 0.25)
        d_mid = int(total_days * 0.40)
        d_late = int(total_days * 0.20)

        if current_day <= d_init:
            return crop.kc_initial
        elif current_day <= (d_init + d_dev):
            progress = (current_day - d_init) / d_dev
            return crop.kc_initial + progress * (crop.kc_mid_season - crop.kc_initial)
        elif current_day <= (d_init + d_dev + d_mid):
            return crop.kc_mid_season
        else:
            progress = min(1.0, (current_day - (d_init + d_dev + d_mid)) / max(1, d_late))
            return crop.kc_mid_season - progress * (crop.kc_mid_season - crop.kc_late_season)
