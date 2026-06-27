from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models import League, User

leagues_bp = Blueprint("leagues", __name__, url_prefix="/api/leagues")

LEAGUES = [
    {"id": 1, "name": "لیگ خوارزمی", "slug": "kharazmi", "min_score": 0, "max_score": 500, "reward_coins": 200, "icon": "⚙️", "description": "سطح ۱ – آغاز راه"},
    {"id": 2, "name": "لیگ ابن‌سینا", "slug": "avicenna", "min_score": 501, "max_score": 1500, "reward_coins": 500, "icon": "🧠", "description": "سطح ۲ – لیگ اندیشه و تحلیل"},
    {"id": 3, "name": "لیگ بیرونی", "slug": "biruni", "min_score": 1501, "max_score": 999999, "reward_coins": 1000, "icon": "🔬", "description": "سطح ۳ – لیگ نخبگان"}
]

@leagues_bp.route("/", methods=["GET"])
def get_leagues():
    return jsonify(LEAGUES), 200

@leagues_bp.route("/my-league", methods=["GET"])
@jwt_required()
def get_my_league():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return {"error": "user not found"}, 404
    
    for league in LEAGUES:
        if league["min_score"] <= user.total_score <= league["max_score"]:
            return {
                "league": league,
                "score": user.total_score,
                "next_league": next((l for l in LEAGUES if l["min_score"] > user.total_score), None)
            }, 200
    
    return {"error": "no league found"}, 404
