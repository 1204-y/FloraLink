"""Observation API tests."""
from .utils import auth_headers, login_user, register_user


def test_create_and_list_observations(client):
    """Users can report sightings that appear in the public feed."""

    register_user(client, email="observer@example.com")
    token = login_user(client, email="observer@example.com")

    species_response = client.post(
        "/api/plants/species",
        json={"common_name": "Cherry Blossom"},
    )
    species_id = species_response.json()["id"]

    create_response = client.post(
        "/api/observations",
        json={
            "species_id": species_id,
            "latitude": 30.67,
            "longitude": 104.06,
            "note": "Peak bloom downtown",
        },
        headers=auth_headers(token),
    )
    assert create_response.status_code == 201

    list_response = client.get("/api/observations")
    items = list_response.json()
    assert any(item["species_id"] == species_id for item in items)
