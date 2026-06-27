from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models import Group, GroupMember, User

groups_bp = Blueprint("groups", __name__, url_prefix="/api/groups")

@groups_bp.route("/", methods=["GET"])
def get_groups():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 20, type=int)
    
    pagination = Group.query.order_by(Group.total_score.desc()).paginate(page=page, per_page=per_page)
    
    return jsonify({
        "groups": [{
            "id": g.id,
            "name": g.name,
            "description": g.description,
            "icon": g.icon,
            "total_score": g.total_score,
            "member_count": g.member_count,
            "max_members": g.max_members,
            "created_at": g.created_at.isoformat()
        } for g in pagination.items],
        "total": pagination.total,
        "page": page,
        "per_page": per_page,
        "pages": pagination.pages
    }), 200

@groups_bp.route("/<group_id>", methods=["GET"])
def get_group(group_id):
    group = Group.query.get(group_id)
    if not group:
        return {"error": "group not found"}, 404
    
    members = GroupMember.query.filter_by(group_id=group_id).all()
    
    return {
        "id": group.id,
        "name": group.name,
        "description": group.description,
        "icon": group.icon,
        "total_score": group.total_score,
        "member_count": group.member_count,
        "max_members": group.max_members,
        "created_at": group.created_at.isoformat(),
        "members": [{
            "user_id": m.user_id,
            "username": m.user.username,
            "role": m.role,
            "contribution": m.contribution,
            "joined_at": m.joined_at.isoformat()
        } for m in members]
    }, 200

@groups_bp.route("/create", methods=["POST"])
@jwt_required()
def create_group():
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    
    name = data.get("name", "").strip()
    if not name:
        return {"error": "name is required"}, 400
    
    if Group.query.filter_by(name=name).first():
        return {"error": "group name already exists"}, 409
    
    group = Group(
        name=name,
        description=data.get("description", ""),
        icon=data.get("icon", "🚀"),
        created_by=user_id,
        max_members=data.get("max_members", 50)
    )
    db.session.add(group)
    db.session.flush()
    
    member = GroupMember(
        user_id=user_id,
        group_id=group.id,
        role="leader"
    )
    db.session.add(member)
    group.member_count = 1
    
    db.session.commit()
    
    return {
        "message": "group created",
        "group_id": group.id,
        "group": {
            "id": group.id,
            "name": group.name,
            "description": group.description,
            "icon": group.icon
        }
    }, 201

@groups_bp.route("/<group_id>/join", methods=["POST"])
@jwt_required()
def join_group(group_id):
    user_id = get_jwt_identity()
    group = Group.query.get(group_id)
    if not group:
        return {"error": "group not found"}, 404
    
    if group.member_count >= group.max_members:
        return {"error": "group is full"}, 400
    
    existing = GroupMember.query.filter_by(user_id=user_id, group_id=group_id).first()
    if existing:
        return {"error": "already a member"}, 400
    
    member = GroupMember(user_id=user_id, group_id=group_id, role="member")
    db.session.add(member)
    group.member_count += 1
    db.session.commit()
    
    return {"message": "joined group"}, 200

@groups_bp.route("/<group_id>/leave", methods=["POST"])
@jwt_required()
def leave_group(group_id):
    user_id = get_jwt_identity()
    
    member = GroupMember.query.filter_by(user_id=user_id, group_id=group_id).first()
    if not member:
        return {"error": "not a member"}, 400
    
    group = Group.query.get(group_id)
    
    if member.role == "leader":
        new_leader = GroupMember.query.filter(
            GroupMember.group_id == group_id,
            GroupMember.user_id != user_id
        ).first()
        
        if new_leader:
            new_leader.role = "leader"
        else:
            db.session.delete(group)
            db.session.commit()
            return {"message": "group deleted"}, 200
    
    db.session.delete(member)
    if group:
        group.member_count -= 1
    db.session.commit()
    
    return {"message": "left group"}, 200

@groups_bp.route("/my-groups", methods=["GET"])
@jwt_required()
def get_my_groups():
    user_id = get_jwt_identity()
    memberships = GroupMember.query.filter_by(user_id=user_id).all()
    
    return jsonify([{
        "group_id": m.group_id,
        "group_name": m.group.name,
        "role": m.role,
        "contribution": m.contribution,
        "joined_at": m.joined_at.isoformat()
    } for m in memberships]), 200
