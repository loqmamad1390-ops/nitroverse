from flask import Flask, send_from_directory
from .extensions import db, migrate, jwt, bcrypt, limiter, init_cors
from .config import Config
from .routes.auth import auth_bp
from .routes.profile import profile_bp
from .routes.quiz import quiz_bp
from .routes.leaderboard import leaderboard_bp
from .routes.shop import shop_bp
from .routes.rank import rank_bp
from .routes.achievements import achievement_bp
from .routes.groups import groups_bp
from .routes.leagues import leagues_bp
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    limiter.init_app(app)
    
    # ✅ CORS رو فقط با init_cors تنظیم کن
    init_cors(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(profile_bp)
    app.register_blueprint(quiz_bp)
    app.register_blueprint(leaderboard_bp)
    app.register_blueprint(shop_bp)
    app.register_blueprint(rank_bp)
    app.register_blueprint(achievement_bp)
    app.register_blueprint(groups_bp)
    app.register_blueprint(leagues_bp)

    # ============================================
    # 🚀 سرو کردن فرانت‌اند
    # ============================================
    
    STATIC_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'static')
    
    @app.route('/')
    def serve_index():
        return send_from_directory(STATIC_DIR, 'index.html')

    @app.route('/<path:path>')
    def serve_static(path):
        return send_from_directory(STATIC_DIR, path)

    @app.get("/api")
    def home():
        return {"message": "🔥 NitroVerse backend is running!"}

    @app.route('/list-static')
    def list_static():
        try:
            files = os.listdir(STATIC_DIR)
            return {"files": files, "static_dir": STATIC_DIR}
        except Exception as e:
            return {"error": str(e), "static_dir": STATIC_DIR}

    return app