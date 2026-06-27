from flask import Flask, send_from_directory
from .extensions import db, migrate, jwt, bcrypt, cors, limiter, init_cors
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
    # ✅ مسیر frontend رو به‌روز کن
    frontend_path = os.path.join(os.path.dirname(__file__), 'frontend')
    
    app = Flask(__name__, 
                static_folder=frontend_path,
                static_url_path='')
    
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    limiter.init_app(app)
    
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

    # ===== سرو کردن فرانت‌اند =====
    @app.route('/')
    def serve_index():
        return send_from_directory(app.static_folder, 'index.html')

    @app.route('/<path:path>')
    def serve_static(path):
        file_path = os.path.join(app.static_folder, path)
        if not os.path.exists(file_path):
            return {"error": "File not found"}, 404
        return send_from_directory(app.static_folder, path)

    @app.get("/api")
    def home():
        return {"message": "🔥 NitroVerse backend is running!"}

    return app