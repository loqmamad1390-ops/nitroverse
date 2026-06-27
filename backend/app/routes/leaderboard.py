from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models import User, Profile

leaderboard_bp = Blueprint("leaderboard", __name__, url_prefix="/api/leaderboard")

@leaderboard_bp.route("/", methods=["GET"])
def get_leaderboard():
    limit = request.args.get("limit", 50, type=int)
    province = request.args.get("province", None)
    
    query = User.query
    
    if province:
        query = query.join(User.profile).filter(Profile.province == province)
    
    users = query.order_by(User.total_score.desc()).limit(limit).all()
    
    return jsonify([{
        "rank": idx + 1,
        "user_id": u.id,
        "username": u.username,
        "total_score": u.total_score,
        "current_rank": u.current_rank,
        "province": u.profile.province if u.profile else None,
        "city": u.profile.city if u.profile else None,
        "avatar_url": u.profile.avatar_url if u.profile else None
    } for idx, u in enumerate(users)]), 200

@leaderboard_bp.route("/me", methods=["GET"])
@jwt_required()
def get_my_rank():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return {"error": "user not found"}, 404
    
    rank = User.query.filter(User.total_score > user.total_score).count() + 1
    total_users = User.query.count()
    
    return {
        "rank": rank,
        "total_users": total_users,
        "total_score": user.total_score,
        "username": user.username,
        "current_rank": user.current_rank
    }, 200
