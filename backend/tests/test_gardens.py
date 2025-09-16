"""Tests covering garden timelines and care reminders."""
from .utils import auth_headers, login_user, register_user


def test_garden_lifecycle(client):
    """Users can manage gardens, plants, growth entries and care tasks."""

    register_user(client, email="gardener@example.com")
    token = login_user(client, email="gardener@example.com")

    species_response = client.post(
        "/api/plants/species",
        json={
            "common_name": "Hydrangea",
            "scientific_name": "Hydrangea macrophylla",
        },
    )
    species_id = species_response.json()["id"]

    garden_response = client.post(
        "/api/gardens",
        json={"name": "Balcony", "description": "South facing"},
        headers=auth_headers(token),
    )
    assert garden_response.status_code == 201, garden_response.text
    garden_id = garden_response.json()["id"]

    plant_response = client.post(
        f"/api/gardens/{garden_id}/plants",
        json={"species_id": species_id, "nickname": "Blue Dreams"},
        headers=auth_headers(token),
    )
    plant = plant_response.json()

    entry_response = client.post(
        f"/api/gardens/{garden_id}/plants/{plant['id']}/entries",
        json={"notes": "First bloom!", "height_cm": 45.0},
        headers=auth_headers(token),
    )
    assert entry_response.status_code == 201

    entries_response = client.get(
        f"/api/gardens/{garden_id}/plants/{plant['id']}/entries",
        headers=auth_headers(token),
    )
    entries = entries_response.json()
    assert len(entries) == 1
    assert entries[0]["notes"] == "First bloom!"

    task_response = client.post(
        f"/api/gardens/{garden_id}/plants/{plant['id']}/care-tasks",
        json={"task_type": "Water", "frequency_days": 3},
        headers=auth_headers(token),
    )
    task = task_response.json()

    event_response = client.post(
        f"/api/gardens/{garden_id}/plants/{plant['id']}/care-tasks/{task['id']}/events",
        json={"note": "Completed on schedule"},
        headers=auth_headers(token),
    )
    assert event_response.status_code == 201

    events_response = client.get(
        f"/api/gardens/{garden_id}/plants/{plant['id']}/care-tasks/{task['id']}/events",
        headers=auth_headers(token),
    )
    events = events_response.json()
    assert len(events) == 1
    assert events[0]["note"] == "Completed on schedule"
