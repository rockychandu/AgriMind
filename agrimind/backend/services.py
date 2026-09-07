"""
AgriMind Backend Services
Provides core database CRUD services for authentication and activity tracking.
"""

import json
from typing import Optional, List, Dict, Any
from .database import get_connection
from .auth import hash_password, verify_password, create_session_token, decode_session_token

def register_user(name: str, email: str, password: str, location: str = "Guntur, AP", primary_crop: str = "Cotton", farm_size_acres: float = 3.5) -> Dict[str, Any]:
    conn = get_connection()
    cursor = conn.cursor()
    
    # Check existing email
    cursor.execute("SELECT id FROM users WHERE email = ?", (email.lower().strip(),))
    if cursor.fetchone():
        conn.close()
        raise ValueError("An account with this email address already exists.")
        
    hashed_pwd, salt = hash_password(password)
    cursor.execute(
        """
        INSERT INTO users (name, email, password_hash, salt, location, primary_crop, farm_size_acres)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (name.strip(), email.lower().strip(), hashed_pwd, salt, location, primary_crop, farm_size_acres)
    )
    user_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    token = create_session_token(user_id, email)
    user_data = {
        "id": user_id,
        "name": name,
        "email": email,
        "locationName": location,
        "primaryCrop": primary_crop,
        "farmSizeAcres": str(farm_size_acres),
        "language": "en"
    }
    
    # Log initial activity
    add_user_activity(user_id, "ACCOUNT_CREATED", "Welcome to AgriMind", "Registered new farmer account on AgriMind Platform.")
    
    return {"token": token, "user": user_data}

def login_user(email: str, password: str) -> Dict[str, Any]:
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, name, email, password_hash, salt, location, primary_crop, farm_size_acres FROM users WHERE email = ?", (email.lower().strip(),))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        raise ValueError("Invalid email or password.")
        
    if not verify_password(password, row["password_hash"], row["salt"]):
        raise ValueError("Invalid email or password.")
        
    user_id = row["id"]
    token = create_session_token(user_id, row["email"])
    user_data = {
        "id": user_id,
        "name": row["name"],
        "email": row["email"],
        "locationName": row["location"],
        "primaryCrop": row["primary_crop"],
        "farmSizeAcres": str(row["farm_size_acres"]),
        "language": "en"
    }
    
    add_user_activity(user_id, "USER_LOGIN", "Farmer Logged In", "Successfully authenticated session.")
    
    return {"token": token, "user": user_data}

def get_user_by_token(token: str) -> Optional[Dict[str, Any]]:
    payload = decode_session_token(token)
    if not payload:
        return None
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, location, primary_crop, farm_size_acres FROM users WHERE id = ?", (payload["user_id"],))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        return None
        
    return {
        "id": row["id"],
        "name": row["name"],
        "email": row["email"],
        "locationName": row["location"],
        "primaryCrop": row["primary_crop"],
        "farmSizeAcres": str(row["farm_size_acres"]),
        "language": "en"
    }

def add_user_activity(user_id: int, activity_type: str, title: str, description: str, metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    conn = get_connection()
    cursor = conn.cursor()
    
    meta_json = json.dumps(metadata) if metadata else None
    cursor.execute(
        """
        INSERT INTO activity_history (user_id, activity_type, title, description, metadata_json)
        VALUES (?, ?, ?, ?, ?)
        """,
        (user_id, activity_type, title, description, meta_json)
    )
    activity_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return {
        "id": activity_id,
        "user_id": user_id,
        "activity_type": activity_type,
        "title": title,
        "description": description,
        "metadata": metadata
    }

def get_user_activities(user_id: int, limit: int = 50) -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT id, activity_type, title, description, metadata_json, created_at
        FROM activity_history
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT ?
        """,
        (user_id, limit)
    )
    rows = cursor.fetchall()
    conn.close()
    
    results = []
    for r in rows:
        meta = json.loads(r["metadata_json"]) if r["metadata_json"] else {}
        results.append({
            "id": r["id"],
            "activityType": r["activity_type"],
            "title": r["title"],
            "description": r["description"],
            "metadata": meta,
            "createdAt": r["created_at"]
        })
    return results
