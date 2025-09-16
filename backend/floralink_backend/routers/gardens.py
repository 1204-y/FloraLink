"""Endpoints for managing personal gardens and plant timelines."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import get_current_user
from ..models import CareEvent, CareTask, Garden, GardenPlant, GrowthEntry, User
from ..schemas import (
    CareEventCreate,
    CareEventRead,
    CareTaskCreate,
    CareTaskRead,
    GardenCreate,
    GardenPlantCreate,
    GardenPlantRead,
    GardenRead,
    GrowthEntryCreate,
    GrowthEntryRead,
)

router = APIRouter(prefix="/gardens", tags=["gardens"])


def _get_user_garden(db: Session, garden_id: int, user: User) -> Garden:
    garden = db.get(Garden, garden_id)
    if not garden or garden.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Garden not found")
    return garden


def _get_garden_plant(db: Session, garden: Garden, plant_id: int) -> GardenPlant:
    plant = db.get(GardenPlant, plant_id)
    if not plant or plant.garden_id != garden.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Plant not found")
    return plant


@router.post("", response_model=GardenRead, status_code=status.HTTP_201_CREATED)
def create_garden(
    garden_in: GardenCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
) -> Garden:
    """Create a new garden for the authenticated user."""

    garden = Garden(**garden_in.dict(), user_id=current_user.id)
    db.add(garden)
    db.commit()
    db.refresh(garden)
    return garden


@router.get("/me", response_model=list[GardenRead])
def list_my_gardens(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> list[Garden]:
    """Return all gardens owned by the authenticated user."""

    return db.query(Garden).filter(Garden.user_id == current_user.id).all()


@router.post("/{garden_id}/plants", response_model=GardenPlantRead, status_code=status.HTTP_201_CREATED)
def add_garden_plant(
    garden_id: int,
    plant_in: GardenPlantCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> GardenPlant:
    """Add a plant to a garden owned by the current user."""

    garden = _get_user_garden(db, garden_id, current_user)
    plant = GardenPlant(**plant_in.dict(), garden_id=garden.id)
    db.add(plant)
    db.commit()
    db.refresh(plant)
    return plant


@router.get("/{garden_id}/plants", response_model=list[GardenPlantRead])
def list_garden_plants(
    garden_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
) -> list[GardenPlant]:
    """Return all plants for a specific garden."""

    garden = _get_user_garden(db, garden_id, current_user)
    return db.query(GardenPlant).filter(GardenPlant.garden_id == garden.id).all()


@router.post(
    "/{garden_id}/plants/{plant_id}/entries",
    response_model=GrowthEntryRead,
    status_code=status.HTTP_201_CREATED,
)
def add_growth_entry(
    garden_id: int,
    plant_id: int,
    entry_in: GrowthEntryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> GrowthEntry:
    """Attach a growth log entry to a plant."""

    garden = _get_user_garden(db, garden_id, current_user)
    plant = _get_garden_plant(db, garden, plant_id)
    entry = GrowthEntry(**entry_in.dict(exclude_unset=True), garden_plant_id=plant.id)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


@router.get("/{garden_id}/plants/{plant_id}/entries", response_model=list[GrowthEntryRead])
def list_growth_entries(
    garden_id: int,
    plant_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[GrowthEntry]:
    """Return all growth timeline entries for the given plant."""

    garden = _get_user_garden(db, garden_id, current_user)
    plant = _get_garden_plant(db, garden, plant_id)
    return (
        db.query(GrowthEntry)
        .filter(GrowthEntry.garden_plant_id == plant.id)
        .order_by(GrowthEntry.recorded_at.desc())
        .all()
    )


@router.post(
    "/{garden_id}/plants/{plant_id}/care-tasks",
    response_model=CareTaskRead,
    status_code=status.HTTP_201_CREATED,
)
def create_care_task(
    garden_id: int,
    plant_id: int,
    task_in: CareTaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CareTask:
    """Create a care reminder task for a plant."""

    garden = _get_user_garden(db, garden_id, current_user)
    plant = _get_garden_plant(db, garden, plant_id)
    task = CareTask(**task_in.dict(), garden_plant_id=plant.id)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


@router.get("/{garden_id}/plants/{plant_id}/care-tasks", response_model=list[CareTaskRead])
def list_care_tasks(
    garden_id: int,
    plant_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[CareTask]:
    """List care reminder tasks for a plant."""

    garden = _get_user_garden(db, garden_id, current_user)
    plant = _get_garden_plant(db, garden, plant_id)
    return db.query(CareTask).filter(CareTask.garden_plant_id == plant.id).all()


@router.post(
    "/{garden_id}/plants/{plant_id}/care-tasks/{task_id}/events",
    response_model=CareEventRead,
    status_code=status.HTTP_201_CREATED,
)
def log_care_event(
    garden_id: int,
    plant_id: int,
    task_id: int,
    event_in: CareEventCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> CareEvent:
    """Record completion of a care task."""

    garden = _get_user_garden(db, garden_id, current_user)
    plant = _get_garden_plant(db, garden, plant_id)
    task = db.get(CareTask, task_id)
    if not task or task.garden_plant_id != plant.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Care task not found")
    event = CareEvent(**event_in.dict(exclude_unset=True), care_task_id=task.id)
    db.add(event)
    task.last_completed = event.performed_at
    db.add(task)
    db.commit()
    db.refresh(event)
    return event


@router.get(
    "/{garden_id}/plants/{plant_id}/care-tasks/{task_id}/events",
    response_model=list[CareEventRead],
)
def list_care_events(
    garden_id: int,
    plant_id: int,
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[CareEvent]:
    """List care task history."""

    garden = _get_user_garden(db, garden_id, current_user)
    plant = _get_garden_plant(db, garden, plant_id)
    task = db.get(CareTask, task_id)
    if not task or task.garden_plant_id != plant.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Care task not found")
    return db.query(CareEvent).filter(CareEvent.care_task_id == task.id).order_by(CareEvent.performed_at.desc()).all()
