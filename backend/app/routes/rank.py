from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models import User
from ..services.rank_service import RANKS, get_rank_by_score

rank_bp = Blueprint("rank", __name__, url_prefix="/api/rank")

@rank_bp.route("/", methods=["GET"])
@jwt_required()
def get_my_rank():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return {"error": "user not found"}, 404
    
    current_rank = get_rank_by_score(user.total_score)
    highest_rank = get_rank_by_score(user.total_score)
    
    next_rank = None
    for i, rank in enumerate(RANKS):
        if rank["min_score"] > user.total_score:
            next_rank = rank
            break
    
    return {
        "current": current_rank,
        "highest": highest_rank,
        "score": user.total_score,
        "next_rank": next_rank,
        "progress": user.total_score - current_rank["min_score"] if current_rank else 0
    }, 200

@rank_bp.route("/all", methods=["GET"])
def get_all_ranks():
    return jsonify(RANKS), 200
