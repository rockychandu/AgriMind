import random
from typing import Dict, Any, List
from agrimind.core.domain_types import RiskLevel

class MonteCarloProfitSimulator:
    """Monte-Carlo Farm Profitability Scenario Simulation Engine."""

    def run_simulation(
        self,
        predicted_yield_tonnes_ha: float,
        expected_price_per_tonne: float,
        cost_per_ha: float,
        area_ha: float,
        iterations: int = 1000
    ) -> Dict[str, Any]:
        profits = []
        
        # Seed pseudo-random for deterministic reproducibility
        random.seed(42)

        for _ in range(iterations):
            # Normal distribution variations: Yield SD ~ 15%, Price SD ~ 12%
            y_sim = max(0.1, random.gauss(predicted_yield_tonnes_ha, predicted_yield_tonnes_ha * 0.15))
            p_sim = max(1.0, random.gauss(expected_price_per_tonne, expected_price_per_tonne * 0.12))
            c_sim = max(10.0, random.gauss(cost_per_ha, cost_per_ha * 0.05))

            rev = y_sim * p_sim * area_ha
            exp = c_sim * area_ha
            profit = rev - exp
            profits.append(profit)

        profits.sort()
        
        pessimistic = profits[int(iterations * 0.10)]
        baseline = profits[int(iterations * 0.50)]
        optimistic = profits[int(iterations * 0.90)]

        loss_probability_pct = (sum(1 for p in profits if p < 0) / iterations) * 100.0

        risk_level = RiskLevel.EXTREME if loss_probability_pct > 30.0 else (
            RiskLevel.HIGH if loss_probability_pct > 15.0 else (
                RiskLevel.MODERATE if loss_probability_pct > 5.0 else RiskLevel.LOW
            )
        )

        return {
            "iterations_run": iterations,
            "baseline_projected_profit_usd": round(baseline, 2),
            "pessimistic_profit_p10_usd": round(pessimistic, 2),
            "optimistic_profit_p90_usd": round(optimistic, 2),
            "loss_probability_percentage": round(loss_probability_pct, 1),
            "risk_assessment": risk_level.value,
        }
