from typing import Dict, List

COMMODITY_MARKET_DATA: Dict[str, Dict[str, any]] = {
    "wheat_durum": {"base_price_usd_tonne": 280.0, "volatility": 0.12, "seasonal_peak_month": 4, "export_demand_score": 0.85},
    "wheat_bread": {"base_price_usd_tonne": 260.0, "volatility": 0.10, "seasonal_peak_month": 4, "export_demand_score": 0.80},
    "rice_indica": {"base_price_usd_tonne": 310.0, "volatility": 0.15, "seasonal_peak_month": 11, "export_demand_score": 0.75},
    "rice_basmati": {"base_price_usd_tonne": 650.0, "volatility": 0.18, "seasonal_peak_month": 12, "export_demand_score": 0.95},
    "maize_field": {"base_price_usd_tonne": 210.0, "volatility": 0.14, "seasonal_peak_month": 10, "export_demand_score": 0.70},
    "maize_sweet": {"base_price_usd_tonne": 420.0, "volatility": 0.20, "seasonal_peak_month": 7, "export_demand_score": 0.60},
    "chickpea_kabuli": {"base_price_usd_tonne": 850.0, "volatility": 0.16, "seasonal_peak_month": 3, "export_demand_score": 0.90},
    "soybean_grain": {"base_price_usd_tonne": 520.0, "volatility": 0.15, "seasonal_peak_month": 10, "export_demand_score": 0.92},
    "peanut_runner": {"base_price_usd_tonne": 740.0, "volatility": 0.14, "seasonal_peak_month": 11, "export_demand_score": 0.82},
    "mustard_indian": {"base_price_usd_tonne": 680.0, "volatility": 0.13, "seasonal_peak_month": 3, "export_demand_score": 0.78},
    "tomato_hybrid": {"base_price_usd_tonne": 450.0, "volatility": 0.35, "seasonal_peak_month": 8, "export_demand_score": 0.50},
    "potato_table": {"base_price_usd_tonne": 280.0, "volatility": 0.25, "seasonal_peak_month": 2, "export_demand_score": 0.65},
    "cotton_bt": {"base_price_usd_tonne": 1150.0, "volatility": 0.16, "seasonal_peak_month": 1, "export_demand_score": 0.94},
    "sugarcane_hybrid": {"base_price_usd_tonne": 45.0, "volatility": 0.05, "seasonal_peak_month": 2, "export_demand_score": 0.88},
    "turmeric_curcuma": {"base_price_usd_tonne": 1400.0, "volatility": 0.22, "seasonal_peak_month": 4, "export_demand_score": 0.86},
}
