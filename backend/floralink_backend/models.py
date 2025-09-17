"""SQLAlchemy ORM models for the FloraLink backend."""
from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    city = Column(String(255), nullable=True)
    bio = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    gardens = relationship("Garden", back_populates="owner", cascade="all, delete-orphan")
    posts = relationship("Post", back_populates="author", cascade="all, delete-orphan")
    memberships = relationship("GroupMembership", back_populates="user", cascade="all, delete-orphan")
    observations = relationship("Observation", back_populates="reporter", cascade="all, delete-orphan")
    assistant_messages = relationship(
        "AssistantMessage", back_populates="user", cascade="all, delete-orphan"
    )


class PlantSpecies(Base):
    __tablename__ = "plant_species"

    id = Column(Integer, primary_key=True, index=True)
    common_name = Column(String(255), nullable=False)
    scientific_name = Column(String(255), nullable=True)
    sunlight = Column(String(255), nullable=True)
    watering = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    bloom_season = Column(String(255), nullable=True)

    garden_plants = relationship("GardenPlant", back_populates="species")
    observations = relationship("Observation", back_populates="species")


class Garden(Base):
    __tablename__ = "gardens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    environment_notes = Column(Text, nullable=True)

    owner = relationship("User", back_populates="gardens")
    plants = relationship("GardenPlant", back_populates="garden", cascade="all, delete-orphan")


class GardenPlant(Base):
    __tablename__ = "garden_plants"

    id = Column(Integer, primary_key=True, index=True)
    garden_id = Column(Integer, ForeignKey("gardens.id", ondelete="CASCADE"), nullable=False)
    species_id = Column(Integer, ForeignKey("plant_species.id", ondelete="SET NULL"), nullable=True)
    nickname = Column(String(255), nullable=True)
    acquired_at = Column(Date, nullable=True)
    notes = Column(Text, nullable=True)

    garden = relationship("Garden", back_populates="plants")
    species = relationship("PlantSpecies", back_populates="garden_plants")
    growth_entries = relationship("GrowthEntry", back_populates="plant", cascade="all, delete-orphan")
    care_tasks = relationship("CareTask", back_populates="plant", cascade="all, delete-orphan")


class GrowthEntry(Base):
    __tablename__ = "growth_entries"

    id = Column(Integer, primary_key=True, index=True)
    garden_plant_id = Column(Integer, ForeignKey("garden_plants.id", ondelete="CASCADE"), nullable=False)
    recorded_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    photo_url = Column(String(500), nullable=True)
    notes = Column(Text, nullable=True)
    height_cm = Column(Float, nullable=True)

    plant = relationship("GardenPlant", back_populates="growth_entries")


class CareTask(Base):
    __tablename__ = "care_tasks"

    id = Column(Integer, primary_key=True, index=True)
    garden_plant_id = Column(Integer, ForeignKey("garden_plants.id", ondelete="CASCADE"), nullable=False)
    task_type = Column(String(255), nullable=False)
    frequency_days = Column(Integer, nullable=True)
    notes = Column(Text, nullable=True)
    last_completed = Column(DateTime, nullable=True)

    plant = relationship("GardenPlant", back_populates="care_tasks")
    events = relationship("CareEvent", back_populates="task", cascade="all, delete-orphan")


class CareEvent(Base):
    __tablename__ = "care_events"

    id = Column(Integer, primary_key=True, index=True)
    care_task_id = Column(Integer, ForeignKey("care_tasks.id", ondelete="CASCADE"), nullable=False)
    performed_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    note = Column(Text, nullable=True)

    task = relationship("CareTask", back_populates="events")


class Observation(Base):
    __tablename__ = "observations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    species_id = Column(Integer, ForeignKey("plant_species.id", ondelete="SET NULL"), nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    observed_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    note = Column(Text, nullable=True)
    is_public = Column(Boolean, default=True, nullable=False)
    location_name = Column(String(255), nullable=True)
    photo_url = Column(String(500), nullable=True)

    reporter = relationship("User", back_populates="observations")
    species = relationship("PlantSpecies", back_populates="observations")


class AssistantMessage(Base):
    __tablename__ = "assistant_messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="assistant_messages")


class CommunityGroup(Base):
    __tablename__ = "community_groups"
    __table_args__ = (UniqueConstraint("name", "city", name="uq_group_name_city"),)

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    city = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    topic = Column(String(255), nullable=True)

    posts = relationship("Post", back_populates="group", cascade="all, delete-orphan")
    memberships = relationship("GroupMembership", back_populates="group", cascade="all, delete-orphan")


class GroupMembership(Base):
    __tablename__ = "group_memberships"
    __table_args__ = (UniqueConstraint("group_id", "user_id", name="uq_group_user"),)

    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("community_groups.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    joined_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    group = relationship("CommunityGroup", back_populates="memberships")
    user = relationship("User", back_populates="memberships")


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("community_groups.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    group = relationship("CommunityGroup", back_populates="posts")
    author = relationship("User", back_populates="posts")
