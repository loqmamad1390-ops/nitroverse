import uuid
from datetime import datetime
from .extensions import db

def _uuid():
    return str(uuid.uuid4())

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(36), primary_key=True, default=_uuid)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    username = db.Column(db.String(50), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    is_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    total_score = db.Column(db.Integer, default=0)
    current_rank = db.Column(db.String(20), default="normal")
    highest_rank = db.Column(db.String(20), default="normal")
    
    profile = db.relationship("Profile", backref="user", uselist=False, cascade="all, delete-orphan")
    refresh_tokens = db.relationship("RefreshToken", backref="user", cascade="all, delete-orphan")
    quiz_history = db.relationship("QuizHistory", backref="user", cascade="all, delete-orphan")
    achievements = db.relationship("UserAchievement", backref="user", cascade="all, delete-orphan")
    inventory = db.relationship("UserItem", backref="user", cascade="all, delete-orphan")
    group_memberships = db.relationship("GroupMember", backref="user", cascade="all, delete-orphan")

class Profile(db.Model):
    __tablename__ = "profiles"
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), primary_key=True)
    full_name = db.Column(db.String(128))
    city = db.Column(db.String(64))
    province = db.Column(db.String(64))
    age = db.Column(db.Integer)
    school = db.Column(db.String(128))
    avatar_url = db.Column(db.String(255))
    bio = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class RefreshToken(db.Model):
    __tablename__ = "refresh_tokens"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False, index=True)
    token_hash = db.Column(db.String(64), nullable=False, unique=True, index=True)
    expires_at = db.Column(db.DateTime, nullable=False)
    revoked_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class QuizHistory(db.Model):
    __tablename__ = "quiz_history"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    total_questions = db.Column(db.Integer, nullable=False)
    difficulty = db.Column(db.String(20), default="medium")
    category = db.Column(db.String(50), default="general")
    date = db.Column(db.DateTime, default=datetime.utcnow)

class UserAchievement(db.Model):
    __tablename__ = "user_achievements"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    achievement_id = db.Column(db.String(50), nullable=False)
    unlocked_at = db.Column(db.DateTime, default=datetime.utcnow)

class UserItem(db.Model):
    __tablename__ = "user_items"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    item_id = db.Column(db.String(50), nullable=False)
    purchased_at = db.Column(db.DateTime, default=datetime.utcnow)

class UserBalance(db.Model):
    __tablename__ = "user_balances"
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), primary_key=True)
    coins = db.Column(db.Integer, default=150)
    nitro = db.Column(db.Integer, default=10)
    legend = db.Column(db.Integer, default=1)

class Group(db.Model):
    __tablename__ = "groups"
    id = db.Column(db.String(36), primary_key=True, default=_uuid)
    name = db.Column(db.String(50), unique=True, nullable=False, index=True)
    description = db.Column(db.String(255))
    icon = db.Column(db.String(50), default="🚀")
    total_score = db.Column(db.Integer, default=0)
    member_count = db.Column(db.Integer, default=0)
    max_members = db.Column(db.Integer, default=50)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.String(36), db.ForeignKey("users.id"))
    
    members = db.relationship("GroupMember", backref="group", cascade="all, delete-orphan")

class GroupMember(db.Model):
    __tablename__ = "group_members"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id"), nullable=False)
    group_id = db.Column(db.String(36), db.ForeignKey("groups.id"), nullable=False)
    role = db.Column(db.String(20), default="member")
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    contribution = db.Column(db.Integer, default=0)

class League(db.Model):
    __tablename__ = "leagues"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    slug = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.String(255))
    min_score = db.Column(db.Integer, default=0)
    max_score = db.Column(db.Integer, default=999999)
    reward_coins = db.Column(db.Integer, default=0)
    icon = db.Column(db.String(50), default="🏆")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
