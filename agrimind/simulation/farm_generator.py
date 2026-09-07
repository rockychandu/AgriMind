import random
from typing import List, Dict, Any
from agrimind.core.base_models import SoilSample, FieldPlot, FarmerProfile, GeoCoordinates
from agrimind.core.domain_types import SoilType, IrrType, Currency

class FarmDataGenerator:
    """Generates synthetic farm telemetry datasets for enterprise testing."""

    def generate_random_farm(self, num_fields: int = 5) -> FarmerProfile:
        fields = []
        soil_types = list(SoilType)
        irr_types = list(IrrType)

        for i in range(1, num_fields + 1):
            f = FieldPlot(
                field_id=f"field_{i}",
                name=f"Plot #{i}",
                area_hectares=round(random.uniform(1.0, 10.0), 2),
                soil_type=random.choice(soil_types),
                irrigation_type=random.choice(irr_types),
                coordinates=GeoCoordinates(latitude=28.61, longitude=77.20, elevation_meters=216.0)
            )
            fields.append(f)

        return FarmerProfile(
            farmer_id="farmer_001",
            name="Rajesh Kumar",
            region="Indo-Gangetic Basin",
            contact_number="+91-9876543210",
            email="rajesh.farmer@agrimind.org",
            currency=Currency.USD,
            fields=fields
        )
