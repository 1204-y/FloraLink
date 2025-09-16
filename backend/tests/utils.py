"""Helper utilities shared between tests."""
from typing import Any

from fastapi.testclient import TestClient


def register_user(client: TestClient, email: str = "user@example.com", password: str = "password123") -> dict[str, Any]:
    """Register a user and return the API response payload."""

    response = client.post(
        "/api/auth/register",
        json={
            "email": email,
            "password": password,
            "full_name": "Test User",
        },
    )
    assert response.status_code == 201, response.text
    return response.json()


def login_user(client: TestClient, email: str, password: str = "password123") -> str:
    """Return a bearer token for the given credentials."""

    response = client.post(
        "/api/auth/token",
        data={"username": email, "password": password},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    assert response.status_code == 200, response.text
    data = response.json()
    return data["access_token"]


def auth_headers(token: str) -> dict[str, str]:
    """Return an Authorization header for the provided token."""

    return {"Authorization": f"Bearer {token}"}
