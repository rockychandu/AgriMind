"""
AgriMind Security & Authentication Module
Handles password salting/hashing and token verification.
"""

import hashlib
import secrets
import json
import base64
from typing import Optional, Tuple, Dict, Any
from datetime import datetime, timedelta

def hash_password(password: str, salt: Optional[str] = None) -> Tuple[str, str]:
    if not salt:
        salt = secrets.token_hex(16)
    salted = password + salt
    hashed = hashlib.sha256(salted.encode('utf-8')).hexdigest()
    return hashed, salt

def verify_password(password: str, hashed: str, salt: str) -> bool:
    new_hash, _ = hash_password(password, salt)
    return new_hash == hashed

def create_session_token(user_id: int, email: str) -> str:
    payload = {
        "user_id": user_id,
        "email": email,
        "exp": (datetime.utcnow() + timedelta(days=7)).isoformat()
    }
    encoded = base64.b64encode(json.dumps(payload).encode('utf-8')).decode('utf-8')
    signature = hashlib.sha256((encoded + "AGRIMIND_SECRET_KEY_2026").encode('utf-8')).hexdigest()
    return f"{encoded}.{signature}"

def decode_session_token(token: str) -> Optional[Dict[str, Any]]:
    try:
        parts = token.split(".")
        if len(parts) != 2:
            return None
        encoded, signature = parts
        expected_sig = hashlib.sha256((encoded + "AGRIMIND_SECRET_KEY_2026").encode('utf-8')).hexdigest()
        if signature != expected_sig:
            return None
        payload = json.loads(base64.b64decode(encoded.encode('utf-8')).decode('utf-8'))
        exp = datetime.fromisoformat(payload["exp"])
        if datetime.utcnow() > exp:
            return None
        return payload
    except Exception:
        return None
