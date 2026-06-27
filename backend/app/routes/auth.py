from datetime import datetime, timedelta
import hashlib
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity,
    set_refresh_cookies, unset_jwt_cookies,
    get_jwt
)
from ..extensions import db, bcrypt, limiter
from ..models import User, Profile, RefreshToken
from ..config import Config

auth_bp = Blueprint("auth", __name__)

def _hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()

def _public_user(u: User):
    return {
        "id": u.id,
        "email": u.email,
        "username": u.username,
        "is_verified": u.is_verified,
        "profile": {
            "city": u.profile.city if u.profile else None,
            "province": u.profile.province if u.profile else None,
            "age": u.profile.age if u.profile else None,
            "school": u.profile.school if u.profile else None,
            "avatar_url": u.profile.avatar_url if u.profile else None,
        }
    }

@auth_bp.post("/register")
@limiter.limit("10/minute")
def register():
    data = request.get_json(force=True) or {}
    email = (data.get("email") or "").strip().lower()
    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if not email or not username or not password:
        return {"error": "email, username, password required"}, 400
    if len(password) < 8:
        return {"error": "password must be at least 8 characters"}, 400

    if User.query.filter_by(email=email).first():
        return {"error": "email already registered"}, 409
    if User.query.filter_by(username=username).first():
        return {"error": "username already taken"}, 409

    pw_hash = bcrypt.generate_password_hash(password).decode("utf-8")
    user = User(email=email, username=username, password_hash=pw_hash, is_verified=True)
    user.profile = Profile()
    db.session.add(user)
    db.session.commit()

    return {"message": "registered", "user": _public_user(user)}, 201

@auth_bp.post("/login")
@limiter.limit("20/minute")
def login():
    data = request.get_json(force=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return {"error": "invalid credentials"}, 401

    access = create_access_token(identity=user.id)
    refresh = create_refresh_token(identity=user.id)

    token_hash = _hash_token(refresh)
    expires_at = datetime.utcnow() + timedelta(days=Config.REFRESH_TOKEN_DAYS)

    rt = RefreshToken(user_id=user.id, token_hash=token_hash, expires_at=expires_at)
    db.session.add(rt)
    db.session.commit()

    resp = jsonify({"accessToken": access, "user": _public_user(user)})
    set_refresh_cookies(resp, refresh)
    return resp, 200

@auth_bp.post("/refresh")
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    raw_refresh = request.cookies.get("refresh_token_cookie")
    if not raw_refresh:
        return {"error": "missing refresh cookie"}, 401

    token_hash = _hash_token(raw_refresh)
    rt = RefreshToken.query.filter_by(user_id=user_id, token_hash=token_hash, revoked_at=None).first()
    if not rt:
        return {"error": "refresh token revoked"}, 401

    rt.revoked_at = datetime.utcnow()

    new_access = create_access_token(identity=user_id)
    new_refresh = create_refresh_token(identity=user_id)

    new_hash = _hash_token(new_refresh)
    expires_at = datetime.utcnow() + timedelta(days=Config.REFRESH_TOKEN_DAYS)
    db.session.add(RefreshToken(user_id=user_id, token_hash=new_hash, expires_at=expires_at))
    db.session.commit()

    resp = jsonify({"accessToken": new_access})
    set_refresh_cookies(resp, new_refresh)
    return resp, 200

@auth_bp.post("/logout")
def logout():
    raw_refresh = request.cookies.get("refresh_token_cookie")
    if raw_refresh:
        token_hash = _hash_token(raw_refresh)
        rt = RefreshToken.query.filter_by(token_hash=token_hash, revoked_at=None).first()
        if rt:
            rt.revoked_at = datetime.utcnow()
            db.session.commit()

    resp = jsonify({"message": "logged out"})
    unset_jwt_cookies(resp)
    return resp, 200

@auth_bp.get("/me")
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return {"error": "user not found"}, 404
    return {"user": _public_user(user)}, 200
