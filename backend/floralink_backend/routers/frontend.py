"""Aggregated data endpoints powering the interactive frontend."""
from __future__ import annotations

"""Aggregated data endpoints powering the interactive frontend."""
from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, selectinload

from ..database import get_db
from ..deps import get_current_user
from ..models import CareTask, Garden, GardenPlant, User
from ..schemas import (
    CareTaskSummary,
    GardenDashboard,
    GardenPlantSummary,
    GardenStats,
    GardenSummary,
    GrowthEntrySummary,
)

router = APIRouter(tags=["frontend"])


def _task_due_at(task: CareTask) -> Optional[datetime]:
    if task.frequency_days is None:
        return None
    if task.last_completed is None:
        return datetime.utcnow()
    return task.last_completed + timedelta(days=task.frequency_days)


def _task_priority(task: CareTask) -> str:
    if task.frequency_days is None:
        return "低"
    if task.frequency_days <= 3:
        return "高"
    if task.frequency_days <= 7:
        return "中"
    return "低"


@router.get("/garden", response_model=GardenDashboard)
def garden_dashboard(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
) -> GardenDashboard:
    """Return a dashboard-style summary of the current user's garden data."""

    gardens: List[Garden] = (
        db.query(Garden)
        .filter(Garden.user_id == current_user.id)
        .options(
            selectinload(Garden.plants)
            .selectinload(GardenPlant.growth_entries),
            selectinload(Garden.plants)
            .selectinload(GardenPlant.care_tasks),
            selectinload(Garden.plants)
            .selectinload(GardenPlant.species),
        )
        .all()
    )

    now = datetime.utcnow()
    task_summaries: List[CareTaskSummary] = []
    due_tasks = 0
    upcoming_tasks = 0

    garden_payload: List[GardenSummary] = []
    for garden in gardens:
        plant_payload: List[GardenPlantSummary] = []
        for plant in garden.plants:
            timeline = [
                GrowthEntrySummary(
                    id=entry.id,
                    recorded_at=entry.recorded_at,
                    notes=entry.notes,
                    photo_url=getattr(entry, "photo_url", None),
                    height_cm=entry.height_cm,
                )
                for entry in sorted(plant.growth_entries, key=lambda e: e.recorded_at, reverse=True)[:5]
            ]

            earliest_due: Optional[datetime] = None
            plant_status = "healthy"
            tags: List[str] = []
            if plant.species and plant.species.sunlight:
                tags.append(plant.species.sunlight)
            if plant.species and plant.species.watering:
                tags.append(plant.species.watering)
            if plant.species and plant.species.bloom_season:
                tags.append(f"花期：{plant.species.bloom_season}")
            if plant.notes:
                tags.append(plant.notes)

            for task in plant.care_tasks:
                due_at = _task_due_at(task)
                schedule = "按需"
                if due_at:
                    if due_at <= now:
                        plant_status = "attention"
                        due_tasks += 1
                    elif due_at <= now + timedelta(days=3):
                        upcoming_tasks += 1
                    schedule = due_at.strftime("%m月%d日")
                    if earliest_due is None or due_at < earliest_due:
                        earliest_due = due_at
                task_summaries.append(
                    CareTaskSummary(
                        id=task.id,
                        plant_id=plant.id,
                        plant_name=plant.nickname
                        or (plant.species.common_name if plant.species else "我的植物"),
                        action=task.task_type,
                        schedule=schedule,
                        priority=_task_priority(task),
                        due_at=due_at,
                    )
                )

            plant_payload.append(
                GardenPlantSummary(
                    id=plant.id,
                    garden_id=garden.id,
                    nickname=plant.nickname,
                    species_id=plant.species_id,
                    species_common_name=plant.species.common_name if plant.species else None,
                    species_scientific_name=plant.species.scientific_name if plant.species else None,
                    status=plant_status,
                    environment_notes=garden.environment_notes,
                    next_task=earliest_due.strftime("%Y年%m月%d日") if earliest_due else None,
                    tags=tags[:4],
                    timeline=timeline,
                )
            )

        garden_payload.append(
            GardenSummary(
                id=garden.id,
                name=garden.name,
                description=garden.description,
                latitude=garden.latitude,
                longitude=garden.longitude,
                environment_notes=garden.environment_notes,
                plant_count=len(plant_payload),
                plants=plant_payload,
            )
        )

    stats = GardenStats(
        total_gardens=len(garden_payload),
        total_plants=sum(g.plant_count for g in garden_payload),
        due_tasks=due_tasks,
        upcoming_tasks=upcoming_tasks,
    )

    far_future = now + timedelta(days=365)
    task_summaries.sort(key=lambda t: (t.due_at or far_future, t.priority))

    return GardenDashboard(gardens=garden_payload, tasks=task_summaries[:12], stats=stats)
