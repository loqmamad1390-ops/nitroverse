from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models import UserBalance, UserItem

shop_bp = Blueprint("shop", __name__, url_prefix="/api/shop")

SHOP_ITEMS = {
    "custom": [
        {"id": "avatar_frame_gold", "name": "قاب طلایی آواتار", "price": 50, "currency": "coins", "icon": "🟡"},
        {"id": "avatar_frame_blue", "name": "قاب آبی نئونی", "price": 30, "currency": "coins", "icon": "🔵"},
        {"id": "font_elite", "name": "فونت Elite", "price": 2, "currency": "nitro", "icon": "🅰️"},
        {"id": "theme_darkspace", "name": "تم Dark Space", "price": 1, "currency": "legend", "icon": "🌌"}
    ],
    "honor": [
        {"id": "badge_earlybird", "name": "کاربر اولیه", "price": 1, "currency": "nitro", "icon": "🐣"},
        {"id": "badge_scientist", "name": "نابغه علم", "price": 3, "currency": "nitro", "icon": "🔬"},
        {"id": "badge_master", "name": "استاد رقابت", "price": 2, "currency": "legend", "icon": "🏅"}
    ],
    "effects": [
        {"id": "effect_glow", "name": "افکت درخشان", "price": 40, "currency": "coins", "icon": "✨"},
        {"id": "effect_fire", "name": "افکت شعله‌ای", "price": 2, "currency": "nitro", "icon": "🔥"},
        {"id": "effect_star", "name": "افکت ستاره‌ای", "price": 1, "currency": "legend", "icon": "🌟"}
    ]
}

@shop_bp.route("/items", methods=["GET"])
def get_items():
    category = request.args.get("category", "all")
    
    if category == "all":
        all_items = []
        for cat, items in SHOP_ITEMS.items():
            for item in items:
                all_items.append({**item, "category": cat})
        return jsonify(all_items), 200
    
    return jsonify(SHOP_ITEMS.get(category, [])), 200

@shop_bp.route("/balance", methods=["GET"])
@jwt_required()
def get_balance():
    user_id = get_jwt_identity()
    balance = UserBalance.query.get(user_id)
    if not balance:
        balance = UserBalance(user_id=user_id)
        db.session.add(balance)
        db.session.commit()
    
    return {
        "coins": balance.coins,
        "nitro": balance.nitro,
        "legend": balance.legend
    }, 200

@shop_bp.route("/buy", methods=["POST"])
@jwt_required()
def buy_item():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    item_id = data.get("item_id")
    
    if not item_id:
        return {"error": "item_id required"}, 400
    
    item = None
    for category, items in SHOP_ITEMS.items():
        for it in items:
            if it["id"] == item_id:
                item = it
                break
        if item:
            break
    
    if not item:
        return {"error": "item not found"}, 404
    
    balance = UserBalance.query.get(user_id)
    if not balance:
        balance = UserBalance(user_id=user_id)
        db.session.add(balance)
    
    currency = item["currency"]
    price = item["price"]
    
    if getattr(balance, currency) < price:
        return {"error": f"insufficient {currency}"}, 400
    
    setattr(balance, currency, getattr(balance, currency) - price)
    
    user_item = UserItem(user_id=user_id, item_id=item_id)
    db.session.add(user_item)
    db.session.commit()
    
    return {
        "message": "item purchased",
        "item": item,
        "balance": {
            "coins": balance.coins,
            "nitro": balance.nitro,
            "legend": balance.legend
        }
    }, 201

@shop_bp.route("/inventory", methods=["GET"])
@jwt_required()
def get_inventory():
    user_id = get_jwt_identity()
    items = UserItem.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": i.item_id, "purchased_at": i.purchased_at.isoformat()} for i in items]), 200
