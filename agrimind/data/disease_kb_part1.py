from typing import Dict
from agrimind.core.base_models import PathogenInfo
from agrimind.core.domain_types import PathogenType

DISEASE_KB_PART1: Dict[str, PathogenInfo] = {
    "wheat_rust_stripe": PathogenInfo(
        pathogen_id="wheat_rust_stripe",
        common_name="Stripe Rust / Yellow Rust of Wheat",
        scientific_name="Puccinia striiformis f. sp. tritici",
        pathogen_type=PathogenType.FUNGAL,
        host_crops=["wheat_durum", "wheat_bread", "barley_malting"],
        symptoms=["yellow_stripes_on_leaves", "powdery_yellow_pustules", "foliar_chlorosis", "stunted_spikes"],
        favorable_humidity_min=75.0,
        favorable_temp_min=8.0,
        favorable_temp_max=16.0,
        chemical_treatment=["Propiconazole 25% EC", "Tebuconazole 50% + Trifloxystrobin 25% WG", "Mancozeb 75% WP"],
        organic_treatment=["Neem oil 10,000 ppm formulation", "Trichoderma viride foliar spray", "Copper oxychloride"],
        preventative_measures=["Plant resistant cultivar (e.g. HD-2967, DBW-187)", "Avoid excessive nitrogen application", "Remove volunteer host grasses"]
    ),
    "rice_blast": PathogenInfo(
        pathogen_id="rice_blast",
        common_name="Rice Blast",
        scientific_name="Magnaporthe oryzae",
        pathogen_type=PathogenType.FUNGAL,
        host_crops=["rice_indica", "rice_basmati"],
        symptoms=["spindle_shaped_lesions", "diamond_spots_with_gray_center", "neck_rot", "node_blackening"],
        favorable_humidity_min=85.0,
        favorable_temp_min=20.0,
        favorable_temp_max=28.0,
        chemical_treatment=["Tricyclazole 75% WP", "Isoprothiolane 40% EC", "Kasugamycin 3% SL"],
        organic_treatment=["Pseudomonas fluorescens 1%", "Bacillus subtilis strain QST 713", "Garlic extract spray"],
        preventative_measures=["Maintain proper standing water depth", "Split nitrogen fertilizer applications", "Seed treatment with Carbendazim"]
    ),
    "potato_late_blight": PathogenInfo(
        pathogen_id="potato_late_blight",
        common_name="Late Blight of Potato & Tomato",
        scientific_name="Phytophthora infestans",
        pathogen_type=PathogenType.FUNGAL,
        host_crops=["potato_table", "tomato_hybrid"],
        symptoms=["water_soaked_lesions", "white_cottony_mold_under_leaf", "dark_brown_tuber_rot", "rapid_foliar_collapse"],
        favorable_humidity_min=90.0,
        favorable_temp_min=12.0,
        favorable_temp_max=22.0,
        chemical_treatment=["Cymoxanil 8% + Mancozeb 64% WP", "Dimethomorph 50% WP", "Metalaxyl 8% + Mancozeb 64% WP"],
        organic_treatment=["Bordeaux mixture 1%", "Copper hydroxide 77% WP", "Bio-agent Trichoderma harzianum"],
        preventative_measures=["Destroy infected haulms before harvest", "Hilling up to cover tubers with soil", "Ensure adequate field air circulation"]
    ),
    "tomato_bacterial_wilt": PathogenInfo(
        pathogen_id="tomato_bacterial_wilt",
        common_name="Bacterial Wilt of Solanaceous Crops",
        scientific_name="Ralstonia solanacearum",
        pathogen_type=PathogenType.BACTERIAL,
        host_crops=["tomato_hybrid", "potato_table"],
        symptoms=["rapid_wilting_without_yellowing", "vascular_browning", "white_bacterial_ooze_from_stem_cut", "stunted_growth"],
        favorable_humidity_min=80.0,
        favorable_temp_min=25.0,
        favorable_temp_max=35.0,
        chemical_treatment=["Streptocycline (Streptomycin sulphate + Tetracycline)", "Copper oxychloride 50% WP drench"],
        organic_treatment=["Soil drench with Pseudomonas fluorescens", "Neem cake soil amendment (250 kg/ha)"],
        preventative_measures=["Crop rotation with non-solanaceous crops (maize, sorghum)", "Use solarized nursery bed soil", "Avoid field irrigation run-off between plots"]
    ),
}
