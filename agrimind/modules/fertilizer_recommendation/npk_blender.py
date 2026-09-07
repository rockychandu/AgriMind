from typing import Dict, List, Any
from agrimind.core.base_models import FertilizerProduct
from agrimind.data import FERTILIZER_CATALOG

class FertilizerBlender:
    """Stoichiometric Fertilizer Blending Engine for NPK Deficit Satisfaction."""

    def __init__(self, catalog: Dict[str, FertilizerProduct] = None):
        self.catalog = catalog or FERTILIZER_CATALOG

    def calculate_fertilizer_blend(
        self,
        n_deficit_kg_ha: float,
        p_deficit_kg_ha: float,
        k_deficit_kg_ha: float
    ) -> List[Dict[str, Any]]:
        blend = []
        total_cost = 0.0

        # Step 1: Satisfy Phosphorus using DAP (18% N, 46% P2O5)
        dap_kg_ha = 0.0
        if p_deficit_kg_ha > 0:
            dap_product = self.catalog.get("dap_18_46")
            if dap_product:
                dap_kg_ha = (p_deficit_kg_ha / (dap_product.p2o5_pct / 100.0))
                n_supplied_by_dap = dap_kg_ha * (dap_product.nitrogen_pct / 100.0)
                n_deficit_kg_ha = max(0.0, n_deficit_kg_ha - n_supplied_by_dap)
                
                cost = dap_kg_ha * dap_product.price_per_kg
                total_cost += cost
                blend.append({
                    "product_id": dap_product.product_id,
                    "product_name": dap_product.name,
                    "rate_kg_ha": round(dap_kg_ha, 2),
                    "cost_per_ha": round(cost, 2),
                    "nutrient_supplied": f"P2O5: {round(p_deficit_kg_ha, 1)} kg, N: {round(n_supplied_by_dap, 1)} kg"
                })

        # Step 2: Satisfy remaining Nitrogen using Urea (46% N)
        if n_deficit_kg_ha > 0:
            urea_product = self.catalog.get("urea_46")
            if urea_product:
                urea_kg_ha = (n_deficit_kg_ha / (urea_product.nitrogen_pct / 100.0))
                cost = urea_kg_ha * urea_product.price_per_kg
                total_cost += cost
                blend.append({
                    "product_id": urea_product.product_id,
                    "product_name": urea_product.name,
                    "rate_kg_ha": round(urea_kg_ha, 2),
                    "cost_per_ha": round(cost, 2),
                    "nutrient_supplied": f"N: {round(n_deficit_kg_ha, 1)} kg"
                })

        # Step 3: Satisfy Potassium using MOP (60% K2O)
        if k_deficit_kg_ha > 0:
            mop_product = self.catalog.get("mop_60")
            if mop_product:
                mop_kg_ha = (k_deficit_kg_ha / (mop_product.k2o_pct / 100.0))
                cost = mop_kg_ha * mop_product.price_per_kg
                total_cost += cost
                blend.append({
                    "product_id": mop_product.product_id,
                    "product_name": mop_product.name,
                    "rate_kg_ha": round(mop_kg_ha, 2),
                    "cost_per_ha": round(cost, 2),
                    "nutrient_supplied": f"K2O: {round(k_deficit_kg_ha, 1)} kg"
                })

        return blend
