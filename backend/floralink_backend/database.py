"""Database configuration, migrations, and session utilities."""
from __future__ import annotations

from typing import Optional

from sqlalchemy import create_engine, inspect, text
from sqlalchemy.engine import Engine
from sqlalchemy.orm import declarative_base, sessionmaker

from .core.config import settings

engine = create_engine(settings.database_url, connect_args={"check_same_thread": False} if settings.database_url.startswith("sqlite") else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """Yield a database session for FastAPI dependencies."""

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def ensure_observation_columns(bind: Optional[Engine] = None) -> None:
    """Ensure optional observation columns exist for legacy databases.

    Earlier iterations of the project created the ``observations`` table without
    the ``location_name`` and ``photo_url`` columns. When those fields were
    introduced the schema wasn't automatically migrated, which caused runtime
    ``OperationalError`` exceptions for existing SQLite databases.  This helper
    inspects the current table definition and adds the missing columns using
    ``ALTER TABLE`` statements so that legacy installations remain compatible
    without requiring a dedicated migration framework.

    Args:
        bind: Optional engine to run the migration against.  When omitted the
            module-level ``engine`` configured from settings is used.
    """

    engine_to_use = bind or engine

    with engine_to_use.begin() as connection:
        inspector = inspect(connection)

        if "observations" not in inspector.get_table_names():
            # Database hasn't created the table yet; ``create_all`` will handle it.
            return

        columns = {column["name"] for column in inspector.get_columns("observations")}

        if "location_name" not in columns:
            connection.execute(
                text("ALTER TABLE observations ADD COLUMN location_name VARCHAR(255)")
            )

        if "photo_url" not in columns:
            connection.execute(
                text("ALTER TABLE observations ADD COLUMN photo_url VARCHAR(500)")
            )
