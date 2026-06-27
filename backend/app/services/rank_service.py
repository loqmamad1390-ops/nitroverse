from ..models import User

RANKS = [
    {"key": "normal", "name": "Normal", "min_score": 0, "icon": "normal"},
    {"key": "bronze", "name": "Bronze", "min_score": 500, "icon": "bronze"},
    {"key": "silver", "name": "Silver", "min_score": 1000, "icon": "silver"},
    {"key": "gold", "name": "Gold", "min_score": 1500, "icon": "gold"},
    {"key": "diamond", "name": "Diamond", "min_score": 2200, "icon": "diamond"},
    {"key": "legendary", "name": "Legendary", "min_score": 3000, "icon": "legendary"},
    {"key": "immortal", "name": "Immortal", "min_score": 4000, "icon": "immortal"}
]

def get_rank_by_score(score):
    rank = RANKS[0]
    for r in RANKS:
        if score >= r["min_score"]:
            rank = r
    return rank

def update_user_rank(user):
    new_rank = get_rank_by_score(user.total_score)
    if new_rank["key"] != user.current_rank:
        user.current_rank = new_rank["key"]
        if RANKS.index(new_rank) > RANKS.index({"key": user.highest_rank} if user.highest_rank else RANKS[0]):
            user.highest_rank = new_rank["key"]
    return user
