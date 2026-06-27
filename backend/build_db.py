# build_db.py
from app import create_app
from app.extensions import db
from app.models import User, Profile, RefreshToken, QuizHistory, UserAchievement, UserItem, UserBalance, Group, GroupMember, League

app = create_app()

with app.app_context():
    print("🔧 Dropping old tables...")
    db.drop_all()
    
    print("🔧 Creating fresh tables...")
    db.create_all()
    
    print("✅ Database created successfully!")
    
    # چک کن
    from sqlalchemy import inspect
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    print(f"📋 Tables: {tables}")