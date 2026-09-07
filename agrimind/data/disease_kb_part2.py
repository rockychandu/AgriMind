from typing import Dict
from agrimind.core.base_models import PathogenInfo
from agrimind.core.domain_types import PathogenType

DISEASE_KB_PART2: Dict[str, PathogenInfo] = {
    "cotton_leaf_curl_virus": PathogenInfo(
        pathogen_id="cotton_leaf_curl_virus",
        common_name="Cotton Leaf Curl Virus (CLCuV)",
        scientific_name="Cotton leaf curl Multan virus",
        pathogen_type=PathogenType.VIRAL,
        host_crops=["cotton_bt"],
        symptoms=["upward_leaf_curling", "thickening_of_leaf_veins", "enation_outgrowths_under_leaf", "stunted_plant_stature"],
        favorable_humidity_min=60.0,
        favorable_temp_min=26.0,
        favorable_temp_max=38.0,
        chemical_treatment=["Imidacloprid 17.8% SL (Vector control)", "Thiamethoxam 25% WG (Vector control)", "Diafenthiuron 50% WP"],
        organic_treatment=["Yellow sticky traps for Bemisia tabaci whitefly", "Neem oil 5% spray", "Verticillium lecanii bio-insecticide"],
        preventative_measures=["Control whitefly vector population early", "Eradicate weed hosts like Abutilon indicum", "Use resistant hybrid varieties"]
    ),
    "nitrogen_deficiency_syndrome": PathogenInfo(
        pathogen_id="nitrogen_deficiency_syndrome",
        common_name="Nitrogen Nutritional Deficiency Chlorosis",
        scientific_name="Abiotic Nitrogen Starvation",
        pathogen_type=PathogenType.NUTRIENT_DEFICIENCY,
        host_crops=["maize_field", "wheat_bread", "rice_indica", "sugarcane_hybrid"],
        symptoms=["v_shaped_yellowing_lower_leaves", "pale_green_canopy", "stunted_tillering", "premature_senescence"],
        favorable_humidity_min=0.0,
        favorable_temp_min=0.0,
        favorable_temp_max=50.0,
        chemical_treatment=["Foliar spray 2% Urea solution", "Side-dressing Urea 46% N (50 kg/ha)", "Calcium Ammonium Nitrate (CAN)"],
        organic_treatment=["Foliar apply Liquid Vermicompost Extract (10%)", "Incorporate Poultry manure / Farm Yard Manure", "Bio-fertilizer Azotobacter / Azospirillum"],
        preventative_measures=["Conduct pre-sowing soil fertility test", "Apply split nitrogen applications aligned with crop demand curves", "Incorporate green manure leguminous cover crops"]
    ),
    "iron_chlorosis": PathogenInfo(
        pathogen_id="iron_chlorosis",
        common_name="Iron Deficiency Interveinal Chlorosis",
        scientific_name="Abiotic Iron Deficiency",
        pathogen_type=PathogenType.NUTRIENT_DEFICIENCY,
        host_crops=["peanut_runner", "sugarcane_hybrid", "rice_basmati", "apple_fuji"],
        symptoms=["interveinal_yellowing_young_leaves", "bleached_white_apical_leaves", "stunted_terminal_buds"],
        favorable_humidity_min=0.0,
        favorable_temp_min=0.0,
        favorable_temp_max=50.0,
        chemical_treatment=["Foliar spray 0.5% FeSO4 (Ferrous Sulfate) + 0.1% Citric Acid", "Chelated Iron Fe-EDDHA soil drench"],
        organic_treatment=["Apply composted farmyard manure enriched with FeSO4", "Soil application of sulfur to reduce high pH"],
        preventative_measures=["Avoid calcareous alkaline soils with pH > 8.0", "Improve soil aeration and prevent waterlogging", "Foliar feed micro-nutrients"]
    ),
}
