"""Endpoints for community discovery and interaction."""
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import get_current_user
from ..models import CommunityGroup, GroupMembership, Post, User
from ..schemas import CommunityGroupCreate, CommunityGroupRead, GroupMembershipRead, PostCreate, PostRead

router = APIRouter(prefix="/communities", tags=["communities"])


@router.post("/groups", response_model=CommunityGroupRead, status_code=status.HTTP_201_CREATED)
def create_group(
    group_in: CommunityGroupCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CommunityGroup:
    """Create a new community group."""

    group = CommunityGroup(**group_in.dict())
    db.add(group)
    db.commit()
    db.refresh(group)
    # Automatically join creator
    membership = GroupMembership(group_id=group.id, user_id=current_user.id)
    db.add(membership)
    db.commit()
    return group


@router.get("/groups", response_model=List[CommunityGroupRead])
def list_groups(
    db: Session = Depends(get_db), city: str | None = Query(None, description="Filter groups by city")
) -> List[CommunityGroup]:
    """Return available community groups, optionally filtered by city."""

    query = db.query(CommunityGroup)
    if city:
        query = query.filter(CommunityGroup.city == city)
    return query.order_by(CommunityGroup.name).all()


@router.post("/groups/{group_id}/join", response_model=GroupMembershipRead)
def join_group(
    group_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> GroupMembership:
    """Join a community group if not already a member."""

    group = db.get(CommunityGroup, group_id)
    if not group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group not found")
    membership = (
        db.query(GroupMembership)
        .filter(GroupMembership.group_id == group_id, GroupMembership.user_id == current_user.id)
        .first()
    )
    if membership:
        return membership
    membership = GroupMembership(group_id=group_id, user_id=current_user.id)
    db.add(membership)
    db.commit()
    db.refresh(membership)
    return membership


@router.post("/groups/{group_id}/posts", response_model=PostRead, status_code=status.HTTP_201_CREATED)
def create_post(
    group_id: int,
    post_in: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Post:
    """Create a post inside a community group."""

    group = db.get(CommunityGroup, group_id)
    if not group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group not found")
    is_member = (
        db.query(GroupMembership)
        .filter(GroupMembership.group_id == group_id, GroupMembership.user_id == current_user.id)
        .first()
    )
    if not is_member:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Join the group before posting")
    post = Post(**post_in.dict(), group_id=group_id, user_id=current_user.id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.get("/groups/{group_id}/posts", response_model=List[PostRead])
def list_posts(group_id: int, db: Session = Depends(get_db)) -> List[Post]:
    """Return posts for a community group."""

    group = db.get(CommunityGroup, group_id)
    if not group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Group not found")
    return (
        db.query(Post)
        .filter(Post.group_id == group_id)
        .order_by(Post.created_at.desc())
        .all()
    )
