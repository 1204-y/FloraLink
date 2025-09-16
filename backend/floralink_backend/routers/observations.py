"""Endpoints for crowd-sourced phenology observations."""
from typing import List, Optional

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import get_current_user
from ..models import Observation, User
from ..schemas import ObservationCreate, ObservationRead

router = APIRouter(prefix="/observations", tags=["observations"])


@router.post("", response_model=ObservationRead, status_code=status.HTTP_201_CREATED)
def create_observation(
    observation_in: ObservationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Observation:
    """Create a new phenology observation."""

    observation = Observation(**observation_in.dict(exclude_unset=True), user_id=current_user.id)
    db.add(observation)
    db.commit()
    db.refresh(observation)
    return observation


@router.get("", response_model=List[ObservationRead])
def list_observations(
    db: Session = Depends(get_db),
    species_id: Optional[int] = Query(None, description="Filter by species"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
) -> List[Observation]:
    """Return recent observations with optional filtering."""

    query = db.query(Observation).order_by(Observation.observed_at.desc())
    if species_id is not None:
        query = query.filter(Observation.species_id == species_id)
    return query.offset(skip).limit(limit).all()
