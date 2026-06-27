from datetime import datetime
from ..extensions import db
from ..models import UserAchievement, QuizHistory, User

ACHIEVEMENTS = [
    {"id": "first_play", "title": "اولین بازی!", "desc": "اولین باری که در آزمون شرکت کردی.", "icon": "🎯"},
    {"id": "ten_correct", "title": "۱۰ پاسخ صحیح!", "desc": "۱۰ پاسخ صحیح گرفتی!", "icon": "💡"},
    {"id": "fifty_points", "title": "۵۰ امتیاز!", "desc": "۵۰ امتیاز در مجموع گرفتی!", "icon": "🔥"},
    {"id": "three_days", "title": "۳ روز فعال!", "desc": "۳ روز پشت سر هم فعالیت کردی.", "icon": "📅"},
    {"id": "hundred_points", "title": "۱۰۰ امتیاز!", "desc": "به ۱۰۰ امتیاز رسیدی!", "icon": "🏆"},
    {"id": "immortal", "title": "رنک ایمورتال!", "desc": "رتبه ۱ در لیدربورد رو کسب کردی!", "icon": "👑"}
]

def check_achievements(user_id):
    user = User.query.get(user_id)
    if not user:
        return
    
    unlocked = {a.achievement_id for a in UserAchievement.query.filter_by(user_id=user_id).all()}
    new_unlocked = []
    
    if "first_play" not in unlocked:
        history = QuizHistory.query.filter_by(user_id=user_id).first()
        if history:
            unlock_achievement(user_id, "first_play")
            new_unlocked.append("first_play")
    
    if "fifty_points" not in unlocked and user.total_score >= 50:
        unlock_achievement(user_id, "fifty_points")
        new_unlocked.append("fifty_points")
    
    if "hundred_points" not in unlocked and user.total_score >= 100:
        unlock_achievement(user_id, "hundred_points")
        new_unlocked.append("hundred_points")
    
    if "ten_correct" not in unlocked:
        history = QuizHistory.query.filter_by(user_id=user_id).all()
        correct = sum(h.score for h in history)
        if correct >= 10:
            unlock_achievement(user_id, "ten_correct")
            new_unlocked.append("ten_correct")
    
    if "three_days" not in unlocked:
        history = QuizHistory.query.filter_by(user_id=user_id).all()
        days = {h.date.date() for h in history}
        if len(days) >= 3:
            unlock_achievement(user_id, "three_days")
            new_unlocked.append("three_days")
    
    if "immortal" not in unlocked and user.current_rank == "immortal":
        unlock_achievement(user_id, "immortal")
        new_unlocked.append("immortal")
    
    return new_unlocked

def unlock_achievement(user_id, achievement_id):
    existing = UserAchievement.query.filter_by(user_id=user_id, achievement_id=achievement_id).first()
    if existing:
        return
    
    ach = UserAchievement(user_id=user_id, achievement_id=achievement_id)
    db.session.add(ach)
    db.session.commit()
