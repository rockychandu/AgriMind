import os
from dataclasses import dataclass, field
from typing import Dict, Any, List

@dataclass
class AgriculturalThresholds:
    min_ph: float = 4.5
    max_ph: float = 9.0
    optimal_ph_min: float = 6.0
    optimal_ph_max: float = 7.5
    max_salinity_ec_ds_m: float = 4.0
    critical_nitrogen_ppm: float = 20.0
    critical_phosphorus_ppm: float = 15.0
    critical_potassium_ppm: float = 120.0
    critical_organic_carbon_percent: float = 0.75
    default_field_capacity_volumetric: float = 0.30
    default_wilting_point_volumetric: float = 0.15
    default_mad_fraction: float = 0.50

@dataclass
class FinancialConfig:
    default_currency: str = "USD"
    tax_rate_percentage: float = 5.0
    contingency_buffer_percentage: float = 10.0
    discount_rate_annual: float = 0.08
    fuel_cost_per_liter: float = 1.25
    labor_hourly_rate: float = 12.50
    water_cost_per_cubic_meter: float = 0.15
    electricity_cost_per_kwh: float = 0.12

@dataclass
class AgriMindConfig:
    app_name: str = "AgriMind"
    environment: str = "production"
    secret_key: str = "agrimind_secret_key_2026_enterprise_agri_analytics"
    db_connection_url: str = "sqlite:///agrimind_farm.db"
    thresholds: AgriculturalThresholds = field(default_factory=AgriculturalThresholds)
    financials: FinancialConfig = field(default_factory=FinancialConfig)
    custom_settings: Dict[str, Any] = field(default_factory=dict)

    @classmethod
    def load_from_env(cls) -> "AgriMindConfig":
        config = cls()
        config.environment = os.getenv("AGRIMIND_ENV", "production")
        config.secret_key = os.getenv("AGRIMIND_SECRET_KEY", config.secret_key)
        config.db_connection_url = os.getenv("DATABASE_URL", config.db_connection_url)
        return config

    def to_dict(self) -> Dict[str, Any]:
        return {
            "app_name": self.app_name,
            "environment": self.environment,
            "db_connection_url": self.db_connection_url,
            "thresholds": {
                "min_ph": self.thresholds.min_ph,
                "max_ph": self.thresholds.max_ph,
                "optimal_ph_min": self.thresholds.optimal_ph_min,
                "optimal_ph_max": self.thresholds.optimal_ph_max,
                "max_salinity_ec_ds_m": self.thresholds.max_salinity_ec_ds_m,
                "critical_nitrogen_ppm": self.thresholds.critical_nitrogen_ppm,
                "critical_phosphorus_ppm": self.thresholds.critical_phosphorus_ppm,
                "critical_potassium_ppm": self.thresholds.critical_potassium_ppm,
                "critical_organic_carbon_percent": self.thresholds.critical_organic_carbon_percent,
            },
            "financials": {
                "default_currency": self.financials.default_currency,
                "tax_rate_percentage": self.financials.tax_rate_percentage,
                "contingency_buffer_percentage": self.financials.contingency_buffer_percentage,
                "discount_rate_annual": self.financials.discount_rate_annual,
            }
        }
