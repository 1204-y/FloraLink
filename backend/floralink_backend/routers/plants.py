"""Endpoints related to plant species data."""
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import PlantSpecies
from ..schemas import PlantSpeciesCreate, PlantSpeciesRead

router = APIRouter(prefix="/plants", tags=["plants"])


@router.post("/species", response_model=PlantSpeciesRead, status_code=status.HTTP_201_CREATED)
def create_species(species_in: PlantSpeciesCreate, db: Session = Depends(get_db)) -> PlantSpecies:
    """Create a new plant species entry."""

    species = PlantSpecies(**species_in.dict())
    db.add(species)
    db.commit()
    db.refresh(species)
    return species


@router.get("/species", response_model=List[PlantSpeciesRead])
def list_species(
    db: Session = Depends(get_db), skip: int = Query(0, ge=0), limit: int = Query(20, ge=1, le=100)
) -> List[PlantSpecies]:
    """Return a paginated list of plant species."""

    return db.query(PlantSpecies).offset(skip).limit(limit).all()


@router.get("/species/{species_id}", response_model=PlantSpeciesRead)
def read_species(species_id: int, db: Session = Depends(get_db)) -> PlantSpecies:
    """Fetch a single plant species by identifier."""

    species = db.get(PlantSpecies, species_id)
    if not species:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Species not found")
    return species
