"""
Launcher script for AgriMind Python REST API Backend Server.
"""

import sys
import os

# Add root directory to sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from agrimind.backend.server import run_server

if __name__ == "__main__":
    run_server(8000)
