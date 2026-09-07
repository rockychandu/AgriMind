from typing import List, Dict, Any

class SchedulePlanner:
    """Phenological stage split-application fertilizer schedule planner."""

    def generate_split_schedule(self, fertilizer_blend: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        schedules = []

        # Stage 1: Basal Application (Sowing / Planting time)
        basal_items = []
        for item in fertilizer_blend:
            pname = item["product_name"]
            rate = item["rate_kg_ha"]
            if "Phosphate" in pname or "DAP" in pname:
                # 100% Phosphorus at Basal
                basal_items.append({"product": pname, "quantity_kg_ha": round(rate, 2), "method": "Soil basal broadcast & incorporation"})
            elif "Urea" in pname:
                # 25% Nitrogen at Basal
                basal_items.append({"product": pname, "quantity_kg_ha": round(rate * 0.25, 2), "method": "Band placement near seed row"})
            elif "Potash" in pname or "MOP" in pname:
                # 50% Potassium at Basal
                basal_items.append({"product": pname, "quantity_kg_ha": round(rate * 0.50, 2), "method": "Basal soil application"})

        schedules.append({
            "stage": "Basal (At Sowing / Transplanting)",
            "timing_days_after_sowing": 0,
            "applications": basal_items,
            "notes": "Apply with moisture in soil. Incorporate DAP/SSP to root zone depth."
        })

        # Stage 2: Vegetative / Tillering Top Dressing
        veg_items = []
        for item in fertilizer_blend:
            pname = item["product_name"]
            rate = item["rate_kg_ha"]
            if "Urea" in pname:
                # 45% Nitrogen at Vegetative
                veg_items.append({"product": pname, "quantity_kg_ha": round(rate * 0.45, 2), "method": "Top dressing / Drip fertigation"})

        schedules.append({
            "stage": "Vegetative Active Growth",
            "timing_days_after_sowing": 30,
            "applications": veg_items,
            "notes": "Ensure soil moisture prior to top dressing Urea to minimize volatilization."
        })

        # Stage 3: Flowering / Panicle Initiation
        flower_items = []
        for item in fertilizer_blend:
            pname = item["product_name"]
            rate = item["rate_kg_ha"]
            if "Urea" in pname:
                # 30% Nitrogen at Flowering
                flower_items.append({"product": pname, "quantity_kg_ha": round(rate * 0.30, 2), "method": "Top dressing / Drip fertigation"})
            elif "Potash" in pname or "MOP" in pname:
                # 50% Potassium at Flowering
                flower_items.append({"product": pname, "quantity_kg_ha": round(rate * 0.50, 2), "method": "Top dressing / Fertigation"})

        schedules.append({
            "stage": "Flowering & Grain Filling",
            "timing_days_after_sowing": 60,
            "applications": flower_items,
            "notes": "Potassium application enhances grain size, test weight, and drought resistance."
        })

        return schedules
