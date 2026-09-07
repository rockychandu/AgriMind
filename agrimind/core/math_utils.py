import math
from typing import List, Tuple, Union, Dict, Optional

def clamp(value: float, min_val: float, max_val: float) -> float:
    return max(min_val, min(value, max_val))

def linear_interpolate(x: float, x0: float, x1: float, y0: float, y1: float) -> float:
    if abs(x1 - x0) < 1e-9:
        return y0
    return y0 + (x - x0) * (y1 - y0) / (x1 - x0)

def normalize_vector(weights: List[float]) -> List[float]:
    s = sum(weights)
    if s == 0:
        return [1.0 / len(weights)] * len(weights)
    return [w / s for w in weights]

def calculate_gdd(t_max: float, t_min: float, t_base: float, t_cutoff: float = 30.0) -> float:
    adj_tmax = min(t_max, t_cutoff)
    adj_tmin = max(t_min, t_base)
    t_avg = (adj_tmax + adj_tmin) / 2.0
    return max(0.0, t_avg - t_base)

def saturation_vapor_pressure(temp_c: float) -> float:
    return 0.6108 * math.exp((17.27 * temp_c) / (temp_c + 237.3))

def actual_vapor_pressure(temp_c: float, relative_humidity_pct: float) -> float:
    e_sat = saturation_vapor_pressure(temp_c)
    return e_sat * (relative_humidity_pct / 100.0)

def slope_vapor_pressure_curve(temp_c: float) -> float:
    return (4098.0 * saturation_vapor_pressure(temp_c)) / ((temp_c + 237.3) ** 2)

def psychrometric_constant(atmospheric_pressure_kpa: float = 101.3) -> float:
    return 0.000665 * atmospheric_pressure_kpa

def atmospheric_pressure_from_elevation(elevation_m: float) -> float:
    return 101.3 * ((293.0 - 0.0065 * elevation_m) / 293.0) ** 5.26

def calculate_fao56_penman_monteith_et0(
    temp_min_c: float,
    temp_max_c: float,
    rh_mean_pct: float,
    wind_speed_2m_ms: float,
    solar_radiation_mj_m2_day: float,
    elevation_m: float = 100.0
) -> float:
    t_mean = (temp_min_c + temp_max_c) / 2.0
    press = atmospheric_pressure_from_elevation(elevation_m)
    gamma = psychrometric_constant(press)
    delta = slope_vapor_pressure_curve(t_mean)
    
    e_sat_tmax = saturation_vapor_pressure(temp_max_c)
    e_sat_tmin = saturation_vapor_pressure(temp_min_c)
    e_s = (e_sat_tmax + e_sat_tmin) / 2.0
    e_a = e_s * (rh_mean_pct / 100.0)
    
    g = 0.0 # Soil heat flux density for daily timestep
    rn = solar_radiation_mj_m2_day * 0.77 # Net radiation estimation (albedo ~ 0.23)
    
    num1 = 0.408 * delta * (rn - g)
    num2 = gamma * (900.0 / (t_mean + 273.0)) * wind_speed_2m_ms * (e_s - e_a)
    den = delta + gamma * (1.0 + 0.34 * wind_speed_2m_ms)
    
    et0 = (num1 + num2) / den
    return max(0.0, et0)

def calculate_topsis_scores(
    decision_matrix: List[List[float]],
    weights: List[float],
    is_benefit_criteria: List[bool]
) -> List[float]:
    num_alternatives = len(decision_matrix)
    num_criteria = len(weights)
    if num_alternatives == 0 or num_criteria == 0:
        return []

    norm_matrix = [[0.0] * num_criteria for _ in range(num_alternatives)]
    for j in range(num_criteria):
        col_sum_sq = math.sqrt(sum(decision_matrix[i][j] ** 2 for i in range(num_alternatives)))
        if col_sum_sq == 0:
            col_sum_sq = 1.0
        for i in range(num_alternatives):
            norm_matrix[i][j] = (decision_matrix[i][j] / col_sum_sq) * weights[j]

    ideal_positive = [0.0] * num_criteria
    ideal_negative = [0.0] * num_criteria
    for j in range(num_criteria):
        col_vals = [norm_matrix[i][j] for i in range(num_alternatives)]
        if is_benefit_criteria[j]:
            ideal_positive[j] = max(col_vals)
            ideal_negative[j] = min(col_vals)
        else:
            ideal_positive[j] = min(col_vals)
            ideal_negative[j] = max(col_vals)

    scores = []
    for i in range(num_alternatives):
        d_pos = math.sqrt(sum((norm_matrix[i][j] - ideal_positive[j]) ** 2 for j in range(num_criteria)))
        d_neg = math.sqrt(sum((norm_matrix[i][j] - ideal_negative[j]) ** 2 for j in range(num_criteria)))
        if d_pos + d_neg == 0:
            scores.append(0.5)
        else:
            scores.append(d_neg / (d_pos + d_neg))
    return scores

def calculate_mean_and_std(values: List[float]) -> Tuple[float, float]:
    if not values:
        return 0.0, 0.0
    mean = sum(values) / len(values)
    variance = sum((x - mean) ** 2 for x in values) / len(values)
    return mean, math.sqrt(variance)

def convert_ppm_to_kg_ha(ppm: float, depth_cm: float = 15.0, bulk_density_g_cm3: float = 1.35) -> float:
    # Soil mass per ha (10,000 m2 * depth * bulk density)
    soil_mass_kg_ha = 10000 * (depth_cm / 100.0) * (bulk_density_g_cm3 * 1000.0)
    return (ppm * soil_mass_kg_ha) / 1000000.0
