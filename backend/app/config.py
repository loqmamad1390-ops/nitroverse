import os
from datetime import timedelta
from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev_secret")
    
    # ✅ مسیر دیتابیس رو به‌روز کن
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", f"sqlite:///{os.path.join(BASE_DIR, 'nitroverse.db')}")
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev_jwt_secret")
    ACCESS_TOKEN_MINUTES = int(os.getenv("ACCESS_TOKEN_MINUTES", "15"))
    REFRESH_TOKEN_DAYS = int(os.getenv("REFRESH_TOKEN_DAYS", "30"))

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=ACCESS_TOKEN_MINUTES)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=REFRESH_TOKEN_DAYS)

    JWT_TOKEN_LOCATION = ["headers", "cookies"]
    JWT_COOKIE_SECURE = False
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_REFRESH_COOKIE_PATH = "/auth/refresh"
    JWT_COOKIE_SAMESITE = "Lax"

    CORS_ORIGIN = os.getenv("CORS_ORIGIN", "http://localhost:5500")