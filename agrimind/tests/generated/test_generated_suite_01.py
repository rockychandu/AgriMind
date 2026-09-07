import unittest
from agrimind.data import ALL_CROPS
from agrimind.core.base_models import SoilSample
from agrimind.core.domain_types import SoilType

class TestGeneratedBatch01(unittest.TestCase):
    def test_case_batch_01_001(self):
        soil = SoilSample("id_1_1", "f", None, SoilType.LOAMY, 6.1, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_002(self):
        soil = SoilSample("id_1_2", "f", None, SoilType.LOAMY, 6.2, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_003(self):
        soil = SoilSample("id_1_3", "f", None, SoilType.LOAMY, 6.3, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_004(self):
        soil = SoilSample("id_1_4", "f", None, SoilType.LOAMY, 6.4, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_005(self):
        soil = SoilSample("id_1_5", "f", None, SoilType.LOAMY, 6.5, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_006(self):
        soil = SoilSample("id_1_6", "f", None, SoilType.LOAMY, 6.6, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_007(self):
        soil = SoilSample("id_1_7", "f", None, SoilType.LOAMY, 6.7, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_008(self):
        soil = SoilSample("id_1_8", "f", None, SoilType.LOAMY, 6.8, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_009(self):
        soil = SoilSample("id_1_9", "f", None, SoilType.LOAMY, 6.9, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_010(self):
        soil = SoilSample("id_1_10", "f", None, SoilType.LOAMY, 7.0, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_011(self):
        soil = SoilSample("id_1_11", "f", None, SoilType.LOAMY, 7.1, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_012(self):
        soil = SoilSample("id_1_12", "f", None, SoilType.LOAMY, 7.2, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_013(self):
        soil = SoilSample("id_1_13", "f", None, SoilType.LOAMY, 7.3, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_014(self):
        soil = SoilSample("id_1_14", "f", None, SoilType.LOAMY, 7.4, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_015(self):
        soil = SoilSample("id_1_15", "f", None, SoilType.LOAMY, 7.5, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_016(self):
        soil = SoilSample("id_1_16", "f", None, SoilType.LOAMY, 7.6, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_017(self):
        soil = SoilSample("id_1_17", "f", None, SoilType.LOAMY, 7.7, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_018(self):
        soil = SoilSample("id_1_18", "f", None, SoilType.LOAMY, 7.8, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_019(self):
        soil = SoilSample("id_1_19", "f", None, SoilType.LOAMY, 7.9, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_020(self):
        soil = SoilSample("id_1_20", "f", None, SoilType.LOAMY, 6.0, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_021(self):
        soil = SoilSample("id_1_21", "f", None, SoilType.LOAMY, 6.1, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_022(self):
        soil = SoilSample("id_1_22", "f", None, SoilType.LOAMY, 6.2, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_023(self):
        soil = SoilSample("id_1_23", "f", None, SoilType.LOAMY, 6.3, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_024(self):
        soil = SoilSample("id_1_24", "f", None, SoilType.LOAMY, 6.4, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_025(self):
        soil = SoilSample("id_1_25", "f", None, SoilType.LOAMY, 6.5, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_026(self):
        soil = SoilSample("id_1_26", "f", None, SoilType.LOAMY, 6.6, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_027(self):
        soil = SoilSample("id_1_27", "f", None, SoilType.LOAMY, 6.7, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_028(self):
        soil = SoilSample("id_1_28", "f", None, SoilType.LOAMY, 6.8, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)
    def test_case_batch_01_029(self):
        soil = SoilSample("id_1_29", "f", None, SoilType.LOAMY, 6.9, 1.0, 0.7, 30.0, 20.0, 180.0)
        self.assertIsNotNone(soil)
        self.assertEqual(soil.soil_type, SoilType.LOAMY)
        self.assertGreater(soil.ph, 5.0)
        self.assertLess(soil.ph, 9.0)

if __name__ == "__main__":
    unittest.main()
