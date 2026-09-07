from typing import Dict
from agrimind.core.base_models import FertilizerProduct
from agrimind.core.domain_types import Currency

FERTILIZER_CATALOG: Dict[str, FertilizerProduct] = {
    "urea_46": FertilizerProduct(
        product_id="urea_46",
        name="Prilled / Granular Urea",
        nitrogen_pct=46.0,
        p2o5_pct=0.0,
        k2o_pct=0.0,
        sulfur_pct=0.0,
        is_organic=False,
        price_per_kg=0.35,
        currency=Currency.USD,
        salt_index=75.4,
        notes="High-analysis nitrogen fertilizer. Highly soluble, susceptible to ammonia volatilization if not incorporated."
    ),
    "dap_18_46": FertilizerProduct(
        product_id="dap_18_46",
        name="Di-Ammonium Phosphate (DAP)",
        nitrogen_pct=18.0,
        p2o5_pct=46.0,
        k2o_pct=0.0,
        sulfur_pct=0.0,
        is_organic=False,
        price_per_kg=0.65,
        currency=Currency.USD,
        salt_index=34.2,
        notes="Standard basal phosphorus fertilizer supplying starter nitrogen and water-soluble phosphate."
    ),
    "mop_60": FertilizerProduct(
        product_id="mop_60",
        name="Muriate of Potash (KCl / MOP)",
        nitrogen_pct=0.0,
        p2o5_pct=0.0,
        k2o_pct=60.0,
        sulfur_pct=0.0,
        is_organic=False,
        price_per_kg=0.55,
        currency=Currency.USD,
        salt_index=116.3,
        notes="Primary potassium source. High chloride content; restrict for chloride-sensitive crops like tobacco and potato."
    ),
    "sop_50": FertilizerProduct(
        product_id="sop_50",
        name="Sulfate of Potash (K2SO4 / SOP)",
        nitrogen_pct=0.0,
        p2o5_pct=0.0,
        k2o_pct=50.0,
        sulfur_pct=17.5,
        is_organic=False,
        price_per_kg=0.90,
        currency=Currency.USD,
        salt_index=46.1,
        notes="Premium low-chloride potassium fertilizer with sulfur benefit. Ideal for fruits, vegetables, and potatoes."
    ),
    "ssp_16": FertilizerProduct(
        product_id="ssp_16",
        name="Single Super Phosphate (SSP)",
        nitrogen_pct=0.0,
        p2o5_pct=16.0,
        k2o_pct=0.0,
        sulfur_pct=11.0,
        calcium_pct=19.0,
        is_organic=False,
        price_per_kg=0.28,
        currency=Currency.USD,
        salt_index=7.8,
        notes="Excellent phosphate source supplying secondary nutrients Calcium and Sulfur for oilseeds and pulses."
    ),
    "npk_19_19_19": FertilizerProduct(
        product_id="npk_19_19_19",
        name="Water Soluble NPK 19:19:19",
        nitrogen_pct=19.0,
        p2o5_pct=19.0,
        k2o_pct=19.0,
        sulfur_pct=0.0,
        is_organic=False,
        price_per_kg=1.20,
        currency=Currency.USD,
        salt_index=45.0,
        notes="Fully water-soluble balanced complex fertilizer suitable for drip fertigation and foliar feeding."
    ),
    "vermicompost": FertilizerProduct(
        product_id="vermicompost",
        name="Organic Vermicompost",
        nitrogen_pct=1.5,
        p2o5_pct=1.0,
        k2o_pct=1.5,
        sulfur_pct=0.5,
        calcium_pct=2.0,
        magnesium_pct=0.5,
        is_organic=True,
        price_per_kg=0.15,
        currency=Currency.USD,
        salt_index=5.0,
        notes="Humus-rich earthworm bio-convertor improving soil CEC, microbial activity, and moisture retention."
    ),
    "zinc_sulfate_33": FertilizerProduct(
        product_id="zinc_sulfate_33",
        name="Zinc Sulfate Monohydrate (33% Zn)",
        nitrogen_pct=0.0,
        p2o5_pct=0.0,
        k2o_pct=0.0,
        sulfur_pct=15.0,
        zinc_pct=33.0,
        is_organic=False,
        price_per_kg=1.80,
        currency=Currency.USD,
        salt_index=30.0,
        notes="Essential micro-nutrient supplement for correcting khaira disease in paddy and corn interveinal chlorosis."
    ),
}
