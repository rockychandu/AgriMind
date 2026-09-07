import logging
import time
import sys
from typing import Callable, Any, Dict, List, Optional
from datetime import datetime

logger = logging.getLogger("agrimind")
logger.setLevel(logging.INFO)
if not logger.handlers:
    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter('[%(asctime)s] [%(levelname)s] [%(name)s]: %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)

class TelemetryTracker:
    def __init__(self):
        self.execution_logs: List[Dict[str, Any]] = []

    def log_event(self, module_name: str, event_name: str, details: Optional[Dict[str, Any]] = None):
        entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "module": module_name,
            "event": event_name,
            "details": details or {}
        }
        self.execution_logs.append(entry)
        logger.info(f"[{module_name}] {event_name}: {details}")

    def track_execution_time(self, module_name: str, operation_name: str):
        def decorator(func: Callable):
            def wrapper(*args, **kwargs):
                start_time = time.time()
                result = func(*args, **kwargs)
                duration_ms = (time.time() - start_time) * 1000.0
                self.log_event(module_name, f"{operation_name}_COMPLETED", {"duration_ms": round(duration_ms, 2)})
                return result
            return wrapper
        return decorator

global_telemetry = TelemetryTracker()
