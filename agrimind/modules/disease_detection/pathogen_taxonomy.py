from typing import Dict, List
from agrimind.data import ALL_DISEASES
from agrimind.core.domain_types import PathogenType

class PathogenTaxonomyIndex:
    """Pathogen Taxonomy Indexer and Host Range Query Engine."""

    def filter_by_pathogen_type(self, p_type: PathogenType) -> List[Dict[str, str]]:
        results = []
        for pid, pathogen in ALL_DISEASES.items():
            if pathogen.pathogen_type == p_type:
                results.append({
                    "id": pid,
                    "name": pathogen.common_name,
                    "scientific_name": pathogen.scientific_name,
                })
        return results

    def get_diseases_for_crop(self, crop_id: str) -> List[Dict[str, str]]:
        results = []
        for pid, pathogen in ALL_DISEASES.items():
            if crop_id in pathogen.host_crops or "all" in pathogen.host_crops:
                results.append({
                    "id": pid,
                    "name": pathogen.common_name,
                    "type": pathogen.pathogen_type.value,
                })
        return results
