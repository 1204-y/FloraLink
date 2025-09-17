"""Application configuration settings."""
from functools import lru_cache
from typing import Optional

from pydantic import BaseSettings, Field, SecretStr, root_validator


class Settings(BaseSettings):
    """Runtime configuration loaded from environment variables."""

    app_name: str = Field("FloraLink API", description="Human readable application name")
    api_v1_prefix: str = Field("/api", description="Base prefix for API routes")
    secret_key: Optional[SecretStr] = Field(
        default=None,
        description="Key used to sign authentication tokens. Must be provided via environment.",
    )
    access_token_expire_minutes: int = Field(
        60 * 24,
        description="Default lifetime for access tokens in minutes.",
    )
    database_url: str = Field(
        "sqlite:///./floralink.db",
        description="SQLAlchemy compatible database URL.",
    )

    class Config:
        env_prefix = "floralink_"
        case_sensitive = False

    @root_validator()
    def validate_secret_key(cls, values: dict) -> dict:
        secret: Optional[SecretStr] = values.get("secret_key")
        if secret is None or not secret.get_secret_value():
            raise ValueError("FLORALINK_SECRET_KEY environment variable must be set")
        return values


@lru_cache()
def get_settings() -> Settings:
    """Return a cached settings instance."""

    return Settings()


settings = get_settings()
