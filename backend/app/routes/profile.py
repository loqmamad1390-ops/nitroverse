from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from ..extensions import db
from ..models import User, Profile, UserBalance

profile_bp = Blueprint("profile", __name__, url_prefix="/api/profile")

@profile_bp.route("/", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return {"error": "user not found"}, 404
    
    balance = UserBalance.query.get(user_id) or UserBalance(user_id=user_id)
    
    return {
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "total_score": user.total_score,
            "current_rank": user.current_rank,
            "highest_rank": user.highest_rank,
            "created_at": user.created_at.isoformat()
        },
        "profile": {
            "full_name": user.profile.full_name if user.profile else None,
            "city": user.profile.city if user.profile else None,
            "province": user.profile.province if user.profile else None,
            "age": user.profile.age if user.profile else None,
            "school": user.profile.school if user.profile else None,
            "avatar_url": user.profile.avatar_url if user.profile else None,
            "bio": user.profile.bio if user.profile else None,
        },
        "balance": {
            "coins": balance.coins,
            "nitro": balance.nitro,
            "legend": balance.legend
        }
    }, 200

@profile_bp.route("/", methods=["PUT"])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return {"error": "user not found"}, 404
    
    data = request.get_json() or {}
    
    if not user.profile:
        user.profile = Profile(user_id=user_id)
    
    if "full_name" in data:
        user.profile.full_name = data["full_name"]
    if "city" in data:
        user.profile.city = data["city"]
    if "province" in data:
        user.profile.province = data["province"]
    if "age" in data:
        user.profile.age = data["age"]
    if "school" in data:
        user.profile.school = data["school"]
    if "avatar_url" in data:
        user.profile.avatar_url = data["avatar_url"]
    if "bio" in data:
        user.profile.bio = data["bio"]
    
    user.profile.updated_at = datetime.utcnow()
    db.session.commit()
    
    return {"message": "profile updated successfully"}, 200
