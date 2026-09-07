from typing import Dict, Any

class BenchmarkComparator:
    """Regional Benchmark Expense Comparator and Budget Variance Analyzer."""

    def compare_with_benchmark(
        self,
        actual_cost_per_ha: float,
        crop_category: str,
        regional_benchmark_per_ha: float = 650.0
    ) -> Dict[str, Any]:
        variance = actual_cost_per_ha - regional_benchmark_per_ha
        variance_pct = (variance / max(1.0, regional_benchmark_per_ha)) * 100.0

        if variance_pct > 15.0:
            status = "Over Budget"
            recommendation = "Review labor and chemical expenditure; optimize split fertigation."
        elif variance_pct < -15.0:
            status = "Under Budget"
            recommendation = "Verify if key nutrient applications were omitted causing potential yield penalties."
        else:
            status = "On Benchmark"
            recommendation = "Operational expenses align well with regional peer averages."

        return {
            "actual_cost_per_ha": round(actual_cost_per_ha, 2),
            "benchmark_cost_per_ha": round(regional_benchmark_per_ha, 2),
            "variance_amount_per_ha": round(variance, 2),
            "variance_percentage": round(variance_pct, 1),
            "budget_status": status,
            "recommendation": recommendation,
        }
