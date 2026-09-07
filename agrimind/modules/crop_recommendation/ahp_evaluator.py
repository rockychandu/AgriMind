import math
from typing import List, Tuple, Dict
from agrimind.core.math_utils import normalize_vector

class AhpEvaluator:
    """Analytical Hierarchy Process (AHP) Pairwise Comparison Matrix Evaluator."""

    def __init__(self):
        # Saaty's Random Index (RI) values for n = 1 to 10
        self.saaty_ri = {1: 0.0, 2: 0.0, 3: 0.58, 4: 0.90, 5: 1.12, 6: 1.24, 7: 1.32, 8: 1.41, 9: 1.45, 10: 1.49}

    def compute_priority_weights(self, comparison_matrix: List[List[float]]) -> Tuple[List[float], float]:
        n = len(comparison_matrix)
        if n == 0:
            return [], 0.0

        # Geometric mean method for priority vector calculation
        geo_means = []
        for i in range(n):
            product = 1.0
            for j in range(n):
                product *= comparison_matrix[i][j]
            geo_means.append(product ** (1.0 / n))

        weights = normalize_vector(geo_means)

        # Consistency Index (CI) and Consistency Ratio (CR)
        lambda_max = 0.0
        for i in range(n):
            row_sum = sum(comparison_matrix[j][i] for j in range(n))
            lambda_max += row_sum * weights[i]

        ci = (lambda_max - n) / max(1, (n - 1))
        ri = self.saaty_ri.get(n, 1.49)
        cr = (ci / ri) if ri > 0 else 0.0

        return weights, round(cr, 4)

    def get_default_agronomic_weights(self) -> List[float]:
        # Criteria: [Soil pH, Water Requirement, Temperature, Yield Potential, Market Price]
        matrix = [
            [1.0, 1.5, 2.0, 0.5, 0.5],
            [0.67, 1.0, 1.5, 0.5, 0.5],
            [0.50, 0.67, 1.0, 0.33, 0.33],
            [2.0, 2.0, 3.0, 1.0, 1.0],
            [2.0, 2.0, 3.0, 1.0, 1.0],
        ]
        weights, _ = self.compute_priority_weights(matrix)
        return weights
