"""Endpoints for user profile management."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import get_current_user
from ..models import User
from ..schemas import UserRead, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserRead)
def read_current_user(current_user: User = Depends(get_current_user)) -> User:
    """Return the authenticated user's profile."""

    return current_user


@router.patch("/me", response_model=UserRead)
def update_current_user(
    update: UserUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
) -> User:
    """Update mutable fields on the current user's profile."""

    for field, value in update.dict(exclude_unset=True).items():
        setattr(current_user, field, value)
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user
