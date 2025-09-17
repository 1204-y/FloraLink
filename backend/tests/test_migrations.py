"""Tests for lightweight startup migrations."""
from sqlalchemy import inspect, text, create_engine
from sqlalchemy.pool import StaticPool

from floralink_backend.database import ensure_observation_columns


def test_ensure_observation_columns_adds_missing_fields():
    """Existing tables without new columns should be upgraded in-place."""

    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    with engine.begin() as connection:
        connection.execute(
            text(
                """
                CREATE TABLE observations (
                    id INTEGER PRIMARY KEY,
                    user_id INTEGER,
                    species_id INTEGER,
                    latitude FLOAT NOT NULL,
                    longitude FLOAT NOT NULL,
                    observed_at DATETIME NOT NULL,
                    note TEXT,
                    is_public BOOLEAN NOT NULL DEFAULT 1
                )
                """
            )
        )

    ensure_observation_columns(engine)

    inspector = inspect(engine)
    column_names = {column["name"] for column in inspector.get_columns("observations")}

    assert "location_name" in column_names
    assert "photo_url" in column_names
