from flask import Flask
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

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    limiter.init_app(app)
    
    # ✅ تنظیم CORS به روش درست
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

    @app.get("/")
    def home():
        return {"message": "🔥 NitroVerse backend is running!"}

    return app