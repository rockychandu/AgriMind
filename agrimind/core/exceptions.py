class AgriMindError(Exception):
    """Base exception class for AgriMind application."""
    def __init__(self, message: str, code: str = "GENERIC_ERROR", details: dict = None):
        super().__init__(message)
        self.message = message
        self.code = code
        self.details = details or {}

class SoilAnalysisError(AgriMindError):
    def __init__(self, message: str, details: dict = None):
        super().__init__(message, code="SOIL_ANALYSIS_ERROR", details=details)

class CropSelectionError(AgriMindError):
    def __init__(self, message: str, details: dict = None):
        super().__init__(message, code="CROP_SELECTION_ERROR", details=details)

class RecommendationError(AgriMindError):
    def __init__(self, message: str, details: dict = None):
        super().__init__(message, code="RECOMMENDATION_ERROR", details=details)

class FertilizerCalculationError(AgriMindError):
    def __init__(self, message: str, details: dict = None):
        super().__init__(message, code="FERTILIZER_ERROR", details=details)

class IrrigationSchedulingError(AgriMindError):
    def __init__(self, message: str, details: dict = None):
        super().__init__(message, code="IRRIGATION_ERROR", details=details)

class DiseaseDetectionError(AgriMindError):
    def __init__(self, message: str, details: dict = None):
        super().__init__(message, code="DISEASE_DETECTION_ERROR", details=details)

class YieldPredictionError(AgriMindError):
    def __init__(self, message: str, details: dict = None):
        super().__init__(message, code="YIELD_PREDICTION_ERROR", details=details)

class ExpenseTrackingError(AgriMindError):
    def __init__(self, message: str, details: dict = None):
        super().__init__(message, code="EXPENSE_TRACKING_ERROR", details=details)

class ProfitPredictionError(AgriMindError):
    def __init__(self, message: str, details: dict = None):
        super().__init__(message, code="PROFIT_PREDICTION_ERROR", details=details)

class DashboardDataError(AgriMindError):
    def __init__(self, message: str, details: dict = None):
        super().__init__(message, code="DASHBOARD_DATA_ERROR", details=details)

class ValidationError(AgriMindError):
    def __init__(self, message: str, details: dict = None):
        super().__init__(message, code="VALIDATION_ERROR", details=details)

class ResourceNotFoundError(AgriMindError):
    def __init__(self, message: str, details: dict = None):
        super().__init__(message, code="RESOURCE_NOT_FOUND", details=details)
