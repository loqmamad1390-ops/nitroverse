# backend/init_db.py
from app import create_app
from app.extensions import db
from app.models import User, Profile, RefreshToken, QuizHistory, UserAchievement, UserItem, UserBalance, Group, GroupMember, League

app = create_app()

with app.app_context():
    print("🚀 Creating database tables...")
    db.create_all()
    print("✅ Database tables created successfully!")