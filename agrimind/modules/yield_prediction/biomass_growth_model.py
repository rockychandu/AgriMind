import math
from typing import List, Dict, Any
from agrimind.core.base_models import CropProfile

class BiomassGrowthSimulator:
    """Radiation Use Efficiency (RUE) Crop Biomass Growth Dynamic Simulator."""

    def simulate_biomass_accumulation(
        self,
        crop: CropProfile,
        daily_solar_rad_mj_m2: List[float],
        rue_g_mj: float = 2.8,
        harvest_index: float = 0.45
    ) -> Dict[str, Any]:
        total_biomass_g_m2 = 0.0
        k_extinction = 0.65 # Canopy light extinction coefficient

        for day, solar_rad in enumerate(daily_solar_rad_mj_m2):
            # LAI sigmoid growth curve approximation
            day_fraction = day / max(1, len(daily_solar_rad_mj_m2))
            lai = 4.5 / (1.0 + math.exp(-10.0 * (day_fraction - 0.4)))
            
            f_par = 1.0 - math.exp(-k_extinction * lai)
            par_mj_m2 = solar_rad * 0.48 # 48% of solar radiation is PAR
            
            daily_biomass = par_mj_m2 * f_par * rue_g_mj
            total_biomass_g_m2 += daily_biomass

        # Convert g/m2 to tonnes/ha (1 g/m2 = 0.01 tonnes/ha)
        total_biomass_tonnes_ha = total_biomass_g_m2 * 0.01
        economic_yield_tonnes_ha = total_biomass_tonnes_ha * harvest_index

        return {
            "total_biomass_tonnes_ha": round(total_biomass_tonnes_ha, 2),
            "harvest_index": harvest_index,
            "simulated_economic_yield_tonnes_ha": round(economic_yield_tonnes_ha, 2),
        }
