from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models import User, QuizHistory, UserBalance
from ..services.rank_service import update_user_rank
from ..services.achievement_service import check_achievements

quiz_bp = Blueprint("quiz", __name__, url_prefix="/api/quiz")

@quiz_bp.route("/history", methods=["GET"])
@jwt_required()
def get_history():
    user_id = get_jwt_identity()
    limit = request.args.get("limit", 50, type=int)
    
    history = QuizHistory.query.filter_by(user_id=user_id)\
        .order_by(QuizHistory.date.desc())\
        .limit(limit).all()
    
    return jsonify([{
        "id": h.id,
        "score": h.score,
        "total": h.total_questions,
        "difficulty": h.difficulty,
        "category": h.category,
        "date": h.date.isoformat()
    } for h in history]), 200

@quiz_bp.route("/save", methods=["POST"])
@jwt_required()
def save_quiz_result():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    
    score = data.get("score", 0)
    total = data.get("total", 0)
    difficulty = data.get("difficulty", "medium")
    category = data.get("category", "general")
    
    history = QuizHistory(
        user_id=user_id,
        score=score,
        total_questions=total,
        difficulty=difficulty,
        category=category
    )
    db.session.add(history)
    
    user = User.query.get(user_id)
    if user:
        user.total_score += score
        update_user_rank(user)
        
        balance = UserBalance.query.get(user_id)
        if balance:
            balance.coins += score // 2
    
    check_achievements(user_id)
    
    db.session.commit()
    
    return {"message": "result saved", "score": score}, 201
