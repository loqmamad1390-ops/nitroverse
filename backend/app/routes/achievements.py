from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models import UserAchievement
from ..services.achievement_service import ACHIEVEMENTS, check_achievements

achievement_bp = Blueprint("achievements", __name__, url_prefix="/api/achievements")

@achievement_bp.route("/", methods=["GET"])
@jwt_required()
def get_achievements():
    user_id = get_jwt_identity()
    
    check_achievements(user_id)
    
    unlocked = UserAchievement.query.filter_by(user_id=user_id).all()
    unlocked_ids = {a.achievement_id for a in unlocked}
    
    result = []
    for ach in ACHIEVEMENTS:
        result.append({
            **ach,
            "unlocked": ach["id"] in unlocked_ids
        })
    
    return jsonify(result), 200

@achievement_bp.route("/unlocked", methods=["GET"])
@jwt_required()
def get_unlocked():
    user_id = get_jwt_identity()
    unlocked = UserAchievement.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": a.achievement_id,
        "unlocked_at": a.unlocked_at.isoformat()
    } for a in unlocked]), 200
