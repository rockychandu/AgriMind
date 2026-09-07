"""
AgriMind Data Packages: Comprehensive agricultural knowledge bases, crop catalogs, soil profiles, pathogen databases, fertilizer matrices, and climate reference data.
"""

from agrimind.data.crop_database_part1 import CROP_CATALOG_PART1
from agrimind.data.crop_database_part2 import CROP_CATALOG_PART2
from agrimind.data.crop_database_part3 import CROP_CATALOG_PART3
from agrimind.data.soil_profiles import REGIONAL_SOIL_PROFILES
from agrimind.data.disease_kb_part1 import DISEASE_KB_PART1
from agrimind.data.disease_kb_part2 import DISEASE_KB_PART2
from agrimind.data.fertilizer_catalog import FERTILIZER_CATALOG
from agrimind.data.climate_zones import CLIMATE_ZONE_PROFILES

ALL_CROPS = {**CROP_CATALOG_PART1, **CROP_CATALOG_PART2, **CROP_CATALOG_PART3}
ALL_DISEASES = {**DISEASE_KB_PART1, **DISEASE_KB_PART2}

__all__ = [
    "ALL_CROPS",
    "ALL_DISEASES",
    "REGIONAL_SOIL_PROFILES",
    "FERTILIZER_CATALOG",
    "CLIMATE_ZONE_PROFILES",
]
