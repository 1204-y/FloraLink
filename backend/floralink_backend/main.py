"""Entry point for the FloraLink FastAPI application."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings
from .database import Base, engine
from .routers import auth, communities, gardens, observations, plants, users

Base.metadata.create_all(bind=engine)

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
