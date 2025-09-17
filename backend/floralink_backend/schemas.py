"""Pydantic models for request and response payloads."""
from datetime import date, datetime
from typing import List, Optional
from typing import Literal

from pydantic import BaseModel, EmailStr, Field


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[int] = None


class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    city: Optional[str] = None
    bio: Optional[str] = Field(None, max_length=2000)


class UserCreate(UserBase):
    password: str = Field(..., min_length=6)


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    city: Optional[str] = None
    bio: Optional[str] = Field(None, max_length=2000)


class UserRead(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


class PlantSpeciesBase(BaseModel):
    common_name: str
    scientific_name: Optional[str] = None
    sunlight: Optional[str] = None
    watering: Optional[str] = None
    description: Optional[str] = None
    bloom_season: Optional[str] = None


class PlantSpeciesCreate(PlantSpeciesBase):
    pass


class PlantSpeciesRead(PlantSpeciesBase):
    id: int

    class Config:
        orm_mode = True


class GardenBase(BaseModel):
    name: str
    description: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    environment_notes: Optional[str] = None


class GardenCreate(GardenBase):
    pass


class GardenRead(GardenBase):
    id: int

    class Config:
        orm_mode = True


class GardenPlantBase(BaseModel):
    species_id: Optional[int] = None
    nickname: Optional[str] = None
    acquired_at: Optional[date] = None
    notes: Optional[str] = None


class GardenPlantCreate(GardenPlantBase):
    pass


class GardenPlantRead(GardenPlantBase):
    id: int

    class Config:
        orm_mode = True


class GrowthEntryBase(BaseModel):
    recorded_at: Optional[datetime] = None
    photo_url: Optional[str] = None
    notes: Optional[str] = None
    height_cm: Optional[float] = None


class GrowthEntryCreate(GrowthEntryBase):
    pass


class GrowthEntryRead(GrowthEntryBase):
    id: int

    class Config:
        orm_mode = True


class CareTaskBase(BaseModel):
    task_type: str
    frequency_days: Optional[int] = None
    notes: Optional[str] = None


class CareTaskCreate(CareTaskBase):
    pass


class CareTaskRead(CareTaskBase):
    id: int
    last_completed: Optional[datetime] = None

    class Config:
        orm_mode = True


class CareEventBase(BaseModel):
    performed_at: Optional[datetime] = None
    note: Optional[str] = None


class CareEventCreate(CareEventBase):
    pass


class CareEventRead(CareEventBase):
    id: int

    class Config:
        orm_mode = True


class ObservationBase(BaseModel):
    species_id: Optional[int] = None
    latitude: float
    longitude: float
    note: Optional[str] = None
    is_public: bool = True
    observed_at: Optional[datetime] = None
    location_name: Optional[str] = None
    photo_url: Optional[str] = None


class ObservationCreate(ObservationBase):
    pass


class ObservationRead(ObservationBase):
    id: int
    reporter_id: Optional[int] = Field(None, alias="user_id")
    species_common_name: Optional[str] = None

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class CommunityGroupBase(BaseModel):
    name: str
    city: Optional[str] = None
    description: Optional[str] = None
    topic: Optional[str] = None


class CommunityGroupCreate(CommunityGroupBase):
    pass


class CommunityGroupRead(CommunityGroupBase):
    id: int

    class Config:
        orm_mode = True


class GroupMembershipRead(BaseModel):
    id: int
    group_id: int
    user_id: int
    joined_at: datetime

    class Config:
        orm_mode = True


class PostBase(BaseModel):
    title: str
    content: str


class PostCreate(PostBase):
    pass


class PostRead(PostBase):
    id: int
    group_id: int
    user_id: Optional[int]
    created_at: datetime

    class Config:
        orm_mode = True


class GrowthEntrySummary(BaseModel):
    id: int
    recorded_at: datetime
    notes: Optional[str] = None
    photo_url: Optional[str] = None
    height_cm: Optional[float] = None

    class Config:
        orm_mode = True


class GardenPlantSummary(BaseModel):
    id: int
    garden_id: int
    nickname: Optional[str] = None
    species_id: Optional[int] = None
    species_common_name: Optional[str] = None
    species_scientific_name: Optional[str] = None
    status: str
    environment_notes: Optional[str] = None
    next_task: Optional[str] = None
    tags: List[str]
    timeline: List[GrowthEntrySummary]


class GardenSummary(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    environment_notes: Optional[str] = None
    plant_count: int
    plants: List[GardenPlantSummary]


class CareTaskSummary(BaseModel):
    id: int
    plant_id: int
    plant_name: str
    action: str
    schedule: str
    priority: Literal["高", "中", "低"]
    due_at: Optional[datetime] = None


class GardenStats(BaseModel):
    total_gardens: int
    total_plants: int
    due_tasks: int
    upcoming_tasks: int


class GardenDashboard(BaseModel):
    gardens: List[GardenSummary]
    tasks: List[CareTaskSummary]
    stats: GardenStats


class AssistantPrompt(BaseModel):
    question: str = Field(..., min_length=2, max_length=500)
    context: Optional[str] = Field(None, max_length=500)


class AssistantMessageRead(BaseModel):
    id: int
    question: str
    answer: str
    created_at: datetime

    class Config:
        orm_mode = True


class AssistantResponse(BaseModel):
    message: AssistantMessageRead
    suggestions: List[str] = []
