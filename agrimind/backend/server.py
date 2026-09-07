"""
AgriMind Pure Python HTTP REST API Server
Runs a lightweight REST API server handling authentication and farmer activity tracking.
"""

from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import urllib.parse
from typing import Dict, Any
from .services import register_user, login_user, get_user_by_token, add_user_activity, get_user_activities

PORT = 8000

class AgriMindAPIRequestHandler(BaseHTTPRequestHandler):

    def _set_headers(self, status: int = 200, content_type: str = "application/json"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(204)

    def _get_bearer_token(self) -> str:
        auth_header = self.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            return auth_header[7:].strip()
        return ""

    def _read_json_body(self) -> Dict[str, Any]:
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length == 0:
            return {}
        raw_body = self.rfile.read(content_length).decode("utf-8")
        return json.loads(raw_body)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        
        if path == "/api/health":
            self._set_headers(200)
            self.wfile.write(json.dumps({"status": "healthy", "service": "AgriMind Python Backend Engine"}).encode("utf-8"))
            return

        token = self._get_bearer_token()
        user = get_user_by_token(token) if token else None

        if path == "/api/user/me":
            if not user:
                self._set_headers(401)
                self.wfile.write(json.dumps({"error": "Unauthorized"}).encode("utf-8"))
                return
            self._set_headers(200)
            self.wfile.write(json.dumps({"user": user}).encode("utf-8"))
            return

        if path == "/api/user/activity":
            if not user:
                self._set_headers(401)
                self.wfile.write(json.dumps({"error": "Unauthorized"}).encode("utf-8"))
                return
            activities = get_user_activities(user["id"])
            self._set_headers(200)
            self.wfile.write(json.dumps({"activities": activities}).encode("utf-8"))
            return

        self._set_headers(404)
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        body = self._read_json_body()

        if path == "/api/auth/signup":
            try:
                name = body.get("name", "")
                email = body.get("email", "")
                password = body.get("password", "")
                location = body.get("locationName", "Guntur, AP")
                crop = body.get("primaryCrop", "Cotton")
                acres = float(body.get("farmSizeAcres", 3.5))

                if not name or not email or not password:
                    raise ValueError("Name, email, and password are required.")

                result = register_user(name, email, password, location, crop, acres)
                self._set_headers(201)
                self.wfile.write(json.dumps(result).encode("utf-8"))
            except ValueError as ve:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": str(ve)}).encode("utf-8"))
            except Exception as e:
                self._set_headers(500)
                self.wfile.write(json.dumps({"error": "Internal server error: " + str(e)}).encode("utf-8"))
            return

        if path == "/api/auth/login":
            try:
                email = body.get("email", "")
                password = body.get("password", "")

                if not email or not password:
                    raise ValueError("Email and password are required.")

                result = login_user(email, password)
                self._set_headers(200)
                self.wfile.write(json.dumps(result).encode("utf-8"))
            except ValueError as ve:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": str(ve)}).encode("utf-8"))
            except Exception as e:
                self._set_headers(500)
                self.wfile.write(json.dumps({"error": "Internal server error"}).encode("utf-8"))
            return

        token = self._get_bearer_token()
        user = get_user_by_token(token) if token else None

        if path == "/api/user/activity":
            if not user:
                self._set_headers(401)
                self.wfile.write(json.dumps({"error": "Unauthorized"}).encode("utf-8"))
                return
            activity_type = body.get("activityType", "GENERAL_ACTION")
            title = body.get("title", "Farm Activity")
            desc = body.get("description", "")
            meta = body.get("metadata", {})
            record = add_user_activity(user["id"], activity_type, title, desc, meta)
            self._set_headers(201)
            self.wfile.write(json.dumps({"activity": record}).encode("utf-8"))
            return

        self._set_headers(404)
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode("utf-8"))


def run_server(port: int = PORT):
    server_address = ("", port)
    httpd = HTTPServer(server_address, AgriMindAPIRequestHandler)
    print(f"🚀 AgriMind Python REST API Backend running on http://localhost:{port}/")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping AgriMind Python Backend...")
        httpd.server_close()

if __name__ == "__main__":
    run_server()
