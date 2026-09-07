import unittest
from datetime import datetime

from agrimind.core.base_models import SoilSample, CropProfile, FarmerProfile, FieldPlot, GeoCoordinates
from agrimind.core.domain_types import SoilType, CropCategory, IrrType, ExpenseCategory
from agrimind.data import ALL_CROPS
from agrimind.modules.crop_selection import CropSelectionEvaluator
from agrimind.modules.soil_analysis import SoilNutrientCalculator, PhEcAnalyzer, SoilTextureAnalyzer, OrganicMatterAnalyzer
from agrimind.modules.crop_recommendation import CropRecommendationEngine
from agrimind.modules.fertilizer_recommendation import DosageCalculator, SchedulePlanner
from agrimind.modules.irrigation_scheduling import IrrigationPlanner
from agrimind.modules.disease_detection import DiseaseDiagnosticEngine
from agrimind.modules.yield_prediction import YieldRegressionEnsemble
from agrimind.modules.expense_tracking import FarmExpenseLedger, CostAllocator
from agrimind.modules.profit_prediction import MonteCarloProfitSimulator, BreakEvenCalculator
from agrimind.modules.farmer_dashboard import DashboardAggregator

class TestAgriMindModules(unittest.TestCase):

    def setUp(self):
        self.sample_soil = SoilSample(
            sample_id="test_s1",
            field_id="test_f1",
            timestamp=datetime.utcnow(),
            soil_type=SoilType.LOAMY,
            ph=6.5,
            ec_ds_m=1.0,
            organic_carbon_percentage=0.70,
            nitrogen_ppm=35.0,
            phosphorus_ppm=20.0,
            potassium_ppm=180.0
        )
        self.wheat_crop = ALL_CROPS["wheat_bread"]

    def test_crop_selection(self):
        evaluator = CropSelectionEvaluator()
        results = evaluator.evaluate_all_crops(self.sample_soil, available_water_mm=500.0, mean_temp_c=20.0)
        self.assertTrue(len(results) > 0)
        self.assertIn("composite_score", results[0])

    def test_soil_analysis(self):
        calc = SoilNutrientCalculator()
        ph_analyzer = PhEcAnalyzer()
        report = calc.generate_full_soil_report(self.sample_soil)
        ph_eval = ph_analyzer.evaluate_ph_condition(self.sample_soil.ph)
        self.assertEqual(report["ph"], 6.5)
        self.assertEqual(ph_eval["condition"], "Optimal / Neutral")

    def test_crop_recommendation(self):
        engine = CropRecommendationEngine()
        recs = engine.generate_recommendations(self.sample_soil, available_water_mm=500.0, mean_temp_c=22.0)
        self.assertTrue(len(recs) > 0)
        self.assertIn("hybrid_score", recs[0])

    def test_fertilizer_recommendation(self):
        dosage_calc = DosageCalculator()
        dose = dosage_calc.compute_recommendation(self.sample_soil, self.wheat_crop)
        self.assertIn("recommended_fertilizer_blend", dose)
        self.assertGreater(len(dose["recommended_fertilizer_blend"]), 0)

    def test_irrigation_scheduling(self):
        planner = IrrigationPlanner()
        forecast = [{"t_min": 14.0, "t_max": 25.0, "rh": 60.0, "wind": 2.0, "solar": 20.0} for _ in range(5)]
        schedule = planner.generate_irrigation_schedule(self.wheat_crop, area_ha=2.0, daily_weather_forecast=forecast)
        self.assertGreater(schedule["total_water_volume_m3"], 0)

    def test_disease_detection(self):
        engine = DiseaseDiagnosticEngine()
        diag = engine.perform_diagnosis("wheat_bread", ["yellow_stripes_on_leaves"], temperature_c=12.0, humidity_pct=85.0)
        self.assertIsNotNone(diag["primary_diagnosis"])

    def test_yield_prediction(self):
        ensemble = YieldRegressionEnsemble()
        pred = ensemble.predict_crop_yield(self.wheat_crop, self.sample_soil, available_water_mm=480.0, mean_temp_c=20.0)
        self.assertGreater(pred["predicted_yield_tonnes_ha"], 0)

    def test_expense_tracking(self):
        ledger = FarmExpenseLedger()
        ledger.record_expense("f1", "s1", ExpenseCategory.SEEDS, "Seeds", 2, "bag", 100.0)
        allocator = CostAllocator()
        res = allocator.compute_cost_per_hectare(ledger, "f1", 2.0)
        self.assertEqual(res["total_expenses_usd"], 200.0)

    def test_profit_prediction(self):
        be = BreakEvenCalculator()
        metrics = be.compute_break_even_metrics(cost_per_ha=600.0, expected_yield_tonnes_ha=5.0, expected_price_per_tonne=260.0, area_ha=2.0)
        self.assertGreater(metrics["net_profit_usd"], 0)

    def test_farmer_dashboard(self):
        aggregator = DashboardAggregator()
        farmer = FarmerProfile("f1", "Test Farmer", "Region", "123", "a@b.com", fields=[])
        summary = aggregator.compile_dashboard_summary(farmer, {}, {}, [])
        self.assertEqual(summary["farmer_id"], "f1")

if __name__ == "__main__":
    unittest.main()
