"""
AgriMind SQLite Database Manager
Handles schema creation, connections, and persistent storage for Users and Activity History.
"""

import sqlite3
import os
from typing import Optional, List, Dict, Any
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "agrimind.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    
    # Create Users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        location TEXT DEFAULT 'Guntur, Andhra Pradesh',
        primary_crop TEXT DEFAULT 'Cotton',
        farm_size_acres REAL DEFAULT 3.5,
        language TEXT DEFAULT 'en',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    # Create Activity History table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS activity_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        activity_type TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        metadata_json TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    """)
    
    conn.commit()
    conn.close()

# Initialize DB on module import
init_db()
