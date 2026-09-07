import math
from typing import Dict, Any
from agrimind.data.market_prices import COMMODITY_MARKET_DATA

class MarketPriceForecaster:
    """Seasonally-Adjusted Commodity Market Price Forecaster."""

    def forecast_harvest_price(
        self,
        crop_id: str,
        harvest_month: int = 10,
        distance_to_market_km: float = 25.0
    ) -> Dict[str, Any]:
        market_data = COMMODITY_MARKET_DATA.get(crop_id, {
            "base_price_usd_tonne": 300.0,
            "volatility": 0.15,
            "seasonal_peak_month": 10,
            "export_demand_score": 0.75
        })

        base = market_data["base_price_usd_tonne"]
        peak = market_data["seasonal_peak_month"]
        volatility = market_data["volatility"]

        # Sinusoidal seasonal price oscillation
        month_diff = abs(harvest_month - peak)
        seasonal_factor = 1.0 + (math.cos(month_diff * (math.pi / 6.0)) * volatility)
        
        # Logistics freight deduction (~ $0.15 / tonne / km)
        transport_cost = distance_to_market_km * 0.15
        net_farmgate_price = (base * seasonal_factor) - transport_cost

        return {
            "crop_id": crop_id,
            "base_market_price_tonne": base,
            "harvest_month": harvest_month,
            "seasonal_multiplier": round(seasonal_factor, 3),
            "transport_deduction_per_tonne": round(transport_cost, 2),
            "forecasted_farmgate_price_per_tonne": round(net_farmgate_price, 2),
        }
