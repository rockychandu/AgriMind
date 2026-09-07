from enum import Enum, auto
from typing import NamedTuple, List, Tuple, Dict, Optional, Union

class CropCategory(Enum):
    CEREAL = "Cereal"
    PULSE = "Pulse"
    OILSEED = "Oilseed"
    VEGETABLE = "Vegetable"
    FRUIT = "Fruit"
    FIBER = "Fiber"
    CASH_CROP = "Cash Crop"
    FORAGE = "Forage"
    SPICE = "Spice"
    TUBER = "Tuber"
    MEDICINAL = "Medicinal"

class SoilType(Enum):
    SANDY = "Sandy"
    LOAMY = "Loamy"
    CLAY = "Clay"
    SILTY = "Silty"
    SANDY_LOAM = "Sandy Loam"
    CLAY_LOAM = "Clay Loam"
    SILT_LOAM = "Silt Loam"
    PEAT = "Peat"
    CHALKY = "Chalky"
    SALINE = "Saline"
    BLACK_COTTON = "Black Cotton"
    RED_LATERITE = "Red Laterite"

class NutrientStatus(Enum):
    DEFICIENT = "Deficient"
    LOW = "Low"
    OPTIMAL = "Optimal"
    HIGH = "High"
    EXCESSIVE = "Excessive"

class DiseaseSeverity(Enum):
    NONE = "None"
    MILD = "Mild"
    MODERATE = "Moderate"
    SEVERE = "Severe"
    CRITICAL = "Critical"

class PathogenType(Enum):
    FUNGAL = "Fungal"
    BACTERIAL = "Bacterial"
    VIRAL = "Viral"
    NEMATODE = "Nematode"
    PHYTOPLASMA = "Phytoplasma"
    NUTRIENT_DEFICIENCY = "Nutrient Deficiency"
    ENVIRONMENTAL_STRESS = "Environmental Stress"

class IrrType(Enum):
    DRIP = "Drip Irrigation"
    SPRINKLER = "Sprinkler Irrigation"
    SURFACE_FLOOD = "Surface Flood"
    FURROW = "Furrow Irrigation"
    SUB_IRRIGATION = "Sub-Irrigation"
    PIVOT = "Center Pivot"
    RAINFED = "Rainfed / Natural"

class GrowthStage(Enum):
    INITIAL_GERMINATION = "Initial / Germination"
    CROP_DEVELOPMENT = "Crop Development / Vegetative"
    MID_SEASON = "Mid-Season / Flowering & Fruiting"
    LATE_SEASON = "Late Season / Maturation"
    HARVEST = "Harvest Stage"

class Currency(Enum):
    USD = "USD"
    INR = "INR"
    EUR = "EUR"
    GBP = "GBP"
    CAD = "CAD"
    AUD = "AUD"
    JPY = "JPY"

class ClimateZone(Enum):
    TROPICAL_WET = "Tropical Wet"
    TROPICAL_DRY = "Tropical Dry / Savanna"
    ARID = "Arid / Desert"
    SEMI_ARID = "Semi-Arid"
    MEDITERRANEAN = "Mediterranean"
    HUMID_SUBTROPICAL = "Humid Subtropical"
    TEMPERATE = "Temperate"
    SUB_ALPINE = "Sub-Alpine"

class ExpenseCategory(Enum):
    SEEDS = "Seeds & Seedlings"
    FERTILIZERS = "Fertilizers & Soil Amendments"
    PESTICIDES = "Pesticides & Crop Protection"
    LABOR = "Labor & Field Hands"
    FUEL_ENERGY = "Fuel & Energy"
    IRRIGATION_WATER = "Irrigation Water Utilities"
    EQUIPMENT_RENTAL = "Equipment Rental & Depreciation"
    LAND_LEASE = "Land Lease & Property Taxes"
    TRANSPORT_LOGISTICS = "Transport & Market Logistics"
    MISCELLANEOUS = "Miscellaneous Operational"

class RiskLevel(Enum):
    VERY_LOW = "Very Low"
    LOW = "Low"
    MODERATE = "Moderate"
    HIGH = "High"
    EXTREME = "Extreme"

class NutrientType(Enum):
    NITROGEN = "N"
    PHOSPHORUS = "P"
    POTASSIUM = "K"
    CALCIUM = "Ca"
    MAGNESIUM = "Mg"
    SULFUR = "S"
    IRON = "Fe"
    MANGANESE = "Mn"
    ZINC = "Zn"
    COPPER = "Cu"
    BORON = "B"
    MOLYBDENUM = "Mo"
    CHLORINE = "Cl"

class SoilTextureFraction(NamedTuple):
    sand_percentage: float
    silt_percentage: float
    clay_percentage: float

class GeoCoordinates(NamedTuple):
    latitude: float
    longitude: float
    elevation_meters: float

class TemperatureRange(NamedTuple):
    min_celsius: float
    max_celsius: float
    optimal_celsius: float

class RainfallRequirements(NamedTuple):
    min_annual_mm: float
    max_annual_mm: float
    optimal_annual_mm: float
