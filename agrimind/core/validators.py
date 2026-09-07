from typing import Any, Dict, List
from agrimind.core.exceptions import ValidationError
from agrimind.core.domain_types import SoilType, CropCategory, IrrType

def validate_soil_sample_data(sample_dict: Dict[str, Any]) -> None:
    if "ph" in sample_dict:
        ph = float(sample_dict["ph"])
        if not (3.0 <= ph <= 11.0):
            raise ValidationError(f"Soil pH value {ph} is out of realistic agricultural range (3.0 - 11.0).")
    
    if "ec_ds_m" in sample_dict:
        ec = float(sample_dict["ec_ds_m"])
        if ec < 0:
            raise ValidationError(f"Soil Electrical Conductivity (EC) {ec} dS/m cannot be negative.")
            
    if "nitrogen_ppm" in sample_dict and float(sample_dict["nitrogen_ppm"]) < 0:
        raise ValidationError("Nitrogen ppm cannot be negative.")

    if "sand_percentage" in sample_dict and "silt_percentage" in sample_dict and "clay_percentage" in sample_dict:
        sand = float(sample_dict["sand_percentage"])
        silt = float(sample_dict["silt_percentage"])
        clay = float(sample_dict["clay_percentage"])
        total = sand + silt + clay
        if abs(total - 100.0) > 1.5:
            raise ValidationError(f"Soil texture fractions (sand={sand}, silt={silt}, clay={clay}) must sum to ~100% (got {total}%).")

def validate_crop_profile_data(crop_dict: Dict[str, Any]) -> None:
    required_fields = ["name", "category", "min_growth_days", "max_growth_days", "water_requirement_mm"]
    for field in required_fields:
        if field not in crop_dict:
            raise ValidationError(f"Missing required crop profile field: '{field}'")
            
    if crop_dict["min_growth_days"] > crop_dict["max_growth_days"]:
        raise ValidationError("min_growth_days cannot be greater than max_growth_days.")

def validate_expense_entry(expense_dict: Dict[str, Any]) -> None:
    if "amount" in expense_dict and float(expense_dict["amount"]) < 0:
        raise ValidationError("Expense amount cannot be negative.")
    if "unit_price" in expense_dict and float(expense_dict["unit_price"]) < 0:
        raise ValidationError("Unit price cannot be negative.")
