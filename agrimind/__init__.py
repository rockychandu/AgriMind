"""
AgriMind Enterprise Agricultural Decision Support System.
A Python-oriented suite covering:
1. Crop Selection
2. Soil Analysis
3. Crop Recommendation
4. Fertilizer Recommendation
5. Irrigation Scheduling
6. Disease Detection
7. Yield Prediction
8. Farm Expense Tracking
9. Profit Prediction
10. Farmer Dashboard
"""

__version__ = "2.5.0"
__author__ = "AgriMind Development Team"

from agrimind.core.config import AgriMindConfig
from agrimind.core.domain_types import (
    CropCategory, SoilType, NutrientStatus, DiseaseSeverity, IrrType, Currency
)

__all__ = [
    "AgriMindConfig",
    "CropCategory",
    "SoilType",
    "NutrientStatus",
    "DiseaseSeverity",
    "IrrType",
    "Currency",
]
