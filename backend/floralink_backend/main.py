"""Entry point for the FloraLink FastAPI application."""
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text
from sqlalchemy.exc import SQLAlchemyError

from .core.config import settings
from .database import Base, engine
from .routers import auth, communities, gardens, observations, plants, users

logger = logging.getLogger(__name__)


def _ensure_observations_columns() -> None:
    """Add newly required columns to the observations table if they are missing."""

    try:
        inspector = inspect(engine)
        if not inspector.has_table("observations"):
            return

        existing_columns = {column["name"] for column in inspector.get_columns("observations")}
        statements = []

        if "location_name" not in existing_columns:
            statements.append((text("ALTER TABLE observations ADD COLUMN location_name VARCHAR(255)"), "location_name"))
        if "photo_url" not in existing_columns:
            statements.append((text("ALTER TABLE observations ADD COLUMN photo_url VARCHAR(500)"), "photo_url"))

        if not statements:
            return

        added_columns = []
        with engine.begin() as connection:
            for statement, column_name in statements:
                connection.execute(statement)
                added_columns.append(column_name)
        logger.info("Ensured observations table has required columns: %s", ", ".join(added_columns))
    except SQLAlchemyError:
        logger.exception("Failed to ensure observations table schema is up to date")
        raise


Base.metadata.create_all(bind=engine)
_ensure_observations_columns()

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=settings.api_v1_prefix)
app.include_router(users.router, prefix=settings.api_v1_prefix)
app.include_router(plants.router, prefix=settings.api_v1_prefix)
app.include_router(gardens.router, prefix=settings.api_v1_prefix)
app.include_router(observations.router, prefix=settings.api_v1_prefix)
app.include_router(communities.router, prefix=settings.api_v1_prefix)


@app.get("/")
def read_root() -> dict[str, str]:
    """Simple health-check endpoint."""

    return {"message": "Welcome to FloraLink"}
