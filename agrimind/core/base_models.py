from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
from datetime import datetime, date

from agrimind.core.domain_types import (
    CropCategory, SoilType, NutrientStatus, DiseaseSeverity, PathogenType,
    IrrType, GrowthStage, Currency, ClimateZone, ExpenseCategory, RiskLevel,
    GeoCoordinates
)

@dataclass
class SoilSample:
    sample_id: str
    field_id: str
    timestamp: datetime
    soil_type: SoilType
    ph: float
    ec_ds_m: float
    organic_carbon_percentage: float
    nitrogen_ppm: float
    phosphorus_ppm: float
    potassium_ppm: float
    calcium_ppm: float = 500.0
    magnesium_ppm: float = 150.0
    sulfur_ppm: float = 20.0
    zinc_ppm: float = 1.5
    iron_ppm: float = 8.0
    manganese_ppm: float = 4.0
    copper_ppm: float = 1.0
    boron_ppm: float = 0.5
    sand_percentage: float = 40.0
    silt_percentage: float = 40.0
    clay_percentage: float = 20.0
    bulk_density_g_cm3: float = 1.35
    cation_exchange_capacity: float = 18.0
    notes: Optional[str] = None

@dataclass
class CropProfile:
    crop_id: str
    name: str
    scientific_name: str
    category: CropCategory
    min_growth_days: int
    max_growth_days: int
    optimal_temperature_min: float
    optimal_temperature_max: float
    base_temperature: float
    cutoff_temperature: float
    min_ph: float
    max_ph: float
    optimal_ph_min: float
    optimal_ph_max: float
    water_requirement_mm: float
    kc_initial: float
    kc_crop_dev: float
    kc_mid_season: float
    kc_late_season: float
    nitrogen_requirement_kg_ha: float
    phosphorus_requirement_kg_ha: float
    potassium_requirement_kg_ha: float
    expected_yield_tonnes_ha: float
    market_price_per_tonne: float
    suitable_soil_types: List[SoilType] = field(default_factory=list)
    salinity_tolerance_ec: float = 2.5
    description: str = ""

@dataclass
class FertilizerProduct:
    product_id: str
    name: str
    nitrogen_pct: float
    p2o5_pct: float
    k2o_pct: float
    sulfur_pct: float = 0.0
    calcium_pct: float = 0.0
    magnesium_pct: float = 0.0
    zinc_pct: float = 0.0
    boron_pct: float = 0.0
    is_organic: bool = False
    price_per_kg: float = 0.50
    currency: Currency = Currency.USD
    salt_index: float = 20.0
    notes: str = ""

@dataclass
class FertilizerRecommendation:
    recommendation_id: str
    crop_id: str
    field_id: str
    created_at: datetime
    target_yield_tonnes_ha: float
    nitrogen_deficit_kg_ha: float
    phosphorus_deficit_kg_ha: float
    potassium_deficit_kg_ha: float
    recommended_products: List[Dict[str, Any]] = field(default_factory=list)
    split_schedule: List[Dict[str, Any]] = field(default_factory=list)
    total_cost_per_ha: float = 0.0
    currency: Currency = Currency.USD
    application_notes: List[str] = field(default_factory=list)

@dataclass
class IrrigationDaySchedule:
    schedule_date: date
    growth_stage: GrowthStage
    kc_value: float
    et0_mm_day: float
    etc_mm_day: float
    effective_rainfall_mm: float
    irrigation_needed_mm: float
    water_volume_liters_per_ha: float
    recommended_duration_minutes: int
    irrigation_type: IrrType

@dataclass
class IrrigationSchedulePlan:
    plan_id: str
    field_id: str
    crop_id: str
    start_date: date
    end_date: date
    total_water_requirement_m3: float
    daily_schedules: List[IrrigationDaySchedule] = field(default_factory=list)
    estimated_energy_kwh: float = 0.0
    estimated_water_cost: float = 0.0
    efficiency_percentage: float = 85.0

@dataclass
class DiseaseSymptomInput:
    affected_part: str
    symptom_type: str
    color_changes: List[str] = field(default_factory=list)
    severity: DiseaseSeverity = DiseaseSeverity.MODERATE
    image_url: Optional[str] = None
    temperature_ambient: Optional[float] = None
    relative_humidity_pct: Optional[float] = None
    leaf_wetness_hours: Optional[float] = None

@dataclass
class PathogenInfo:
    pathogen_id: str
    common_name: str
    scientific_name: str
    pathogen_type: PathogenType
    host_crops: List[str]
    symptoms: List[str]
    favorable_humidity_min: float
    favorable_temp_min: float
    favorable_temp_max: float
    chemical_treatment: List[str]
    organic_treatment: List[str]
    preventative_measures: List[str]

@dataclass
class DiseaseDiagnosisResult:
    diagnosis_id: str
    timestamp: datetime
    crop_id: str
    matched_disease: str
    pathogen_type: PathogenType
    confidence_score: float
    severity: DiseaseSeverity
    risk_level: RiskLevel
    recommended_chemical_controls: List[str] = field(default_factory=list)
    recommended_organic_controls: List[str] = field(default_factory=list)
    preventative_actions: List[str] = field(default_factory=list)

@dataclass
class YieldPredictionResult:
    prediction_id: str
    field_id: str
    crop_id: str
    predicted_yield_tonnes_ha: float
    potential_yield_tonnes_ha: float
    water_stress_penalty_pct: float
    nutrient_stress_penalty_pct: float
    temperature_stress_penalty_pct: float
    pest_disease_penalty_pct: float
    confidence_interval_min: float
    confidence_interval_max: float
    key_yield_drivers: List[str] = field(default_factory=list)

@dataclass
class FarmExpenseEntry:
    entry_id: str
    field_id: str
    crop_season_id: str
    timestamp: datetime
    category: ExpenseCategory
    description: str
    quantity: float
    unit: str
    unit_price: float
    total_amount: float
    currency: Currency = Currency.USD
    paid_to: Optional[str] = None

@dataclass
class ProfitProjection:
    projection_id: str
    field_id: str
    crop_id: str
    season_year: int
    area_hectares: float
    predicted_yield_tonnes_ha: float
    expected_market_price_per_tonne: float
    total_expected_revenue: float
    total_projected_expenses: float
    projected_net_profit: float
    break_even_yield_tonnes_ha: float
    break_even_price_per_tonne: float
    roi_percentage: float
    risk_level: RiskLevel
    optimistic_profit: float
    pessimistic_profit: float
    currency: Currency = Currency.USD

@dataclass
class FieldPlot:
    field_id: str
    name: str
    area_hectares: float
    soil_type: SoilType
    irrigation_type: IrrType
    coordinates: GeoCoordinates
    current_crop_id: Optional[str] = None
    planting_date: Optional[date] = None

@dataclass
class FarmerProfile:
    farmer_id: str
    name: str
    region: str
    contact_number: str
    email: str
    currency: Currency = Currency.USD
    fields: List[FieldPlot] = field(default_factory=list)

@dataclass
class DashboardSummary:
    farmer_id: str
    timestamp: datetime
    total_fields: int
    total_area_hectares: float
    active_crops: List[str]
    total_expenses_ytd: float
    projected_revenue_ytd: float
    projected_net_profit_ytd: float
    pending_irrigation_tasks: int
    disease_alert_count: int
    soil_health_score: float
    recent_alerts: List[Dict[str, Any]] = field(default_factory=list)
