import sys
import json
from datetime import datetime

from agrimind.core.config import AgriMindConfig
from agrimind.core.base_models import SoilSample, CropProfile, FarmerProfile, FieldPlot, GeoCoordinates
from agrimind.core.domain_types import SoilType, CropCategory, IrrType, Currency, ExpenseCategory
from agrimind.data import ALL_CROPS, REGIONAL_SOIL_PROFILES, ALL_DISEASES

from agrimind.modules.crop_selection import CropSelectionEvaluator
from agrimind.modules.soil_analysis import SoilTextureAnalyzer, SoilNutrientCalculator, PhEcAnalyzer, OrganicMatterAnalyzer
from agrimind.modules.crop_recommendation import CropRecommendationEngine
from agrimind.modules.fertilizer_recommendation import DosageCalculator, SchedulePlanner
from agrimind.modules.irrigation_scheduling import IrrigationPlanner
from agrimind.modules.disease_detection import DiseaseDiagnosticEngine
from agrimind.modules.yield_prediction import YieldRegressionEnsemble
from agrimind.modules.expense_tracking import FarmExpenseLedger, CostAllocator
from agrimind.modules.profit_prediction import MonteCarloProfitSimulator, BreakEvenCalculator
from agrimind.modules.farmer_dashboard import DashboardAggregator, AlertEngine, AdvisoryReportExporter


class AgriMindLocalApp:
    """Standalone Local Python Application for AgriMind Decision Support System."""

    def __init__(self):
        self.config = AgriMindConfig()
        self.crop_evaluator = CropSelectionEvaluator()
        self.soil_nutrient_calc = SoilNutrientCalculator()
        self.ph_ec_analyzer = PhEcAnalyzer()
        self.om_analyzer = OrganicMatterAnalyzer()
        self.recommendation_engine = CropRecommendationEngine()
        self.fertilizer_calculator = DosageCalculator()
        self.schedule_planner = SchedulePlanner()
        self.irrigation_planner = IrrigationPlanner()
        self.disease_engine = DiseaseDiagnosticEngine()
        self.yield_ensemble = YieldRegressionEnsemble()
        self.ledger = FarmExpenseLedger()
        self.cost_allocator = CostAllocator()
        self.profit_simulator = MonteCarloProfitSimulator()
        self.break_even_calc = BreakEvenCalculator()
        self.dashboard_aggregator = DashboardAggregator()
        self.alert_engine = AlertEngine()
        self.report_exporter = AdvisoryReportExporter()

    def run_demo(self):
        print("==============================================================")
        print("    AGRIMIND ENTERPRISE AGRICULTURAL DECISION ENGINE (LOCAL)   ")
        print("==============================================================")

        # 1. Sample Soil Setup
        soil = SoilSample(
            sample_id="sample_001",
            field_id="field_alpha",
            timestamp=datetime.utcnow(),
            soil_type=SoilType.LOAMY,
            ph=6.8,
            ec_ds_m=1.1,
            organic_carbon_percentage=0.65,
            nitrogen_ppm=28.0,
            phosphorus_ppm=18.0,
            potassium_ppm=175.0,
            sand_percentage=40.0,
            silt_percentage=40.0,
            clay_percentage=20.0
        )

        print("\n--- 1. SOIL ANALYSIS ENGINE ---")
        soil_report = self.soil_nutrient_calc.generate_full_soil_report(soil)
        ph_info = self.ph_ec_analyzer.evaluate_ph_condition(soil.ph)
        om_info = self.om_analyzer.evaluate_organic_matter_status(soil.organic_carbon_percentage)
        shi = self.om_analyzer.compute_soil_health_index(soil.organic_carbon_percentage, soil.ph, soil.ec_ds_m, soil.nitrogen_ppm, soil.phosphorus_ppm, soil.potassium_ppm)
        print(f"Soil Health Index (0-100): {shi}")
        print(f"pH Condition: {ph_info['condition']} (Amendment: {ph_info['recommended_amendment']})")
        print(f"Organic Matter: {om_info['rating']} (SOC: {soil.organic_carbon_percentage}%)")

        print("\n--- 2. CROP SELECTION ENGINE ---")
        suitable_crops = self.crop_evaluator.evaluate_all_crops(soil, available_water_mm=500.0, mean_temp_c=22.0, top_n=3)
        for idx, c in enumerate(suitable_crops, 1):
            print(f" [{idx}] {c['crop_name']} - Match Score: {c['composite_score']} | Est. Revenue: ${c['est_revenue_per_ha']}/ha")

        print("\n--- 3. CROP RECOMMENDATION ENGINE ---")
        recommendations = self.recommendation_engine.generate_recommendations(soil, available_water_mm=500.0, mean_temp_c=22.0, top_n=3)
        top_crop_id = recommendations[0]["crop_id"]
        top_crop = ALL_CROPS[top_crop_id]
        print(f"Top Recommendation: {top_crop.name} (Hybrid Score: {recommendations[0]['hybrid_score']:.4f})")

        print("\n--- 4. FERTILIZER RECOMMENDATION ENGINE ---")
        fert_dose = self.fertilizer_calculator.compute_recommendation(soil, top_crop)
        print(f"Target Yield: {fert_dose['target_yield_tonnes_ha']} tonnes/ha")
        for b in fert_dose['recommended_fertilizer_blend']:
            print(f"  * {b['product_name']}: {b['rate_kg_ha']} kg/ha (${b['cost_per_ha']}/ha)")

        print("\n--- 5. IRRIGATION SCHEDULING ENGINE ---")
        dummy_weather = [{"t_min": 14.0, "t_max": 26.0, "rh": 65.0, "wind": 2.0, "solar": 21.0} for _ in range(7)]
        irr_schedule = self.irrigation_planner.generate_irrigation_schedule(top_crop, area_ha=2.5, daily_weather_forecast=dummy_weather, irr_type=IrrType.DRIP)
        print(f"7-Day Total Water Volume: {irr_schedule['total_water_volume_m3']} m3 (Est. Cost: ${irr_schedule['estimated_water_cost_usd']})")

        print("\n--- 6. DISEASE DETECTION ENGINE ---")
        diagnosis = self.disease_engine.perform_diagnosis(
            crop_id=top_crop.crop_id,
            observed_symptoms=["yellow_stripes_on_leaves"],
            temperature_c=14.0,
            humidity_pct=85.0
        )
        print(f"Primary Diagnosis: {diagnosis['primary_diagnosis']} (Confidence: {diagnosis['confidence_score']*100:.1f}%)")

        print("\n--- 7. YIELD PREDICTION ENGINE ---")
        yield_pred = self.yield_ensemble.predict_crop_yield(top_crop, soil, available_water_mm=500.0, mean_temp_c=22.0)
        print(f"Predicted Yield: {yield_pred['predicted_yield_tonnes_ha']} tonnes/ha (Potential: {yield_pred['potential_yield_tonnes_ha']} tonnes/ha)")

        print("\n--- 8. FARM EXPENSE TRACKING ENGINE ---")
        self.ledger.record_expense("field_alpha", "season_2026", ExpenseCategory.SEEDS, "High Yield Seed Variety", 2.5, "ha", 140.0)
        self.ledger.record_expense("field_alpha", "season_2026", ExpenseCategory.FERTILIZERS, "Urea & DAP Blend", 5.0, "bags", 55.0)
        exp_summary = self.cost_allocator.compute_cost_per_hectare(self.ledger, "field_alpha", field_area_ha=2.5)
        print(f"Total Operational Expense: ${exp_summary['total_expenses_usd']} (${exp_summary['cost_per_hectare_usd']}/ha)")

        print("\n--- 9. PROFIT PREDICTION ENGINE ---")
        be_metrics = self.break_even_calc.compute_break_even_metrics(
            cost_per_ha=exp_summary['cost_per_hectare_usd'],
            expected_yield_tonnes_ha=yield_pred['predicted_yield_tonnes_ha'],
            expected_price_per_tonne=top_crop.market_price_per_tonne,
            area_ha=2.5
        )
        mc_sim = self.profit_simulator.run_simulation(
            predicted_yield_tonnes_ha=yield_pred['predicted_yield_tonnes_ha'],
            expected_price_per_tonne=top_crop.market_price_per_tonne,
            cost_per_ha=exp_summary['cost_per_hectare_usd'],
            area_ha=2.5
        )
        print(f"Projected Net Profit: ${be_metrics['net_profit_usd']} (ROI: {be_metrics['roi_percentage']}%)")
        print(f"Break-Even Yield: {be_metrics['break_even_yield_tonnes_ha']} tonnes/ha | Break-Even Price: ${be_metrics['break_even_price_per_tonne']}/tonne")
        print(f"Monte-Carlo Baseline Profit: ${mc_sim['baseline_projected_profit_usd']} (Loss Risk: {mc_sim['loss_probability_percentage']}%)")

        print("\n--- 10. FARMER DASHBOARD ENGINE ---")
        farmer = FarmerProfile(
            farmer_id="farmer_001",
            name="Kisan Mitra",
            region="Indo-Gangetic Basin",
            contact_number="+91-9876543210",
            email="kisan@agrimind.org",
            fields=[FieldPlot("field_alpha", "North Field", 2.5, SoilType.LOAMY, IrrType.DRIP, GeoCoordinates(28.6, 77.2, 200.0), top_crop.crop_id)]
        )
        dashboard_data = self.dashboard_aggregator.compile_dashboard_summary(
            farmer=farmer,
            expenses_by_field={"field_alpha": exp_summary['total_expenses_usd']},
            revenues_by_field={"field_alpha": be_metrics['total_expected_revenue_usd']},
            active_alerts=[{"severity": "INFO", "category": "Irrigation", "message": "Optimal soil moisture.", "action_required": "None"}]
        )
        report_text = self.report_exporter.format_text_report(dashboard_data)
        print("\n" + report_text)
        print("==============================================================")
        print("    AGRIMIND LOCAL EXECUTION COMPLETED SUCCESSFULLY           ")
        print("==============================================================")


def main():
    app = AgriMindLocalApp()
    app.run_demo()


if __name__ == "__main__":
    main()
