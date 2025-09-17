"""Integration tests for frontend-oriented composite endpoints."""
from datetime import datetime, timedelta

from .utils import auth_headers, login_user, register_user


def _bootstrap_garden(client):
    register_user(client, email="front@example.com")
    token = login_user(client, email="front@example.com")
    species = client.post(
        "/api/plants/species",
        json={
            "common_name": "Gardenia",
            "scientific_name": "Gardenia jasminoides",
            "sunlight": "半日照",
            "watering": "保持湿润",
        },
    ).json()
    garden = client.post(
        "/api/gardens",
        json={"name": "院子", "description": "小院"},
        headers=auth_headers(token),
    ).json()
    plant = client.post(
        f"/api/gardens/{garden['id']}/plants",
        json={"species_id": species["id"], "nickname": "栀子"},
        headers=auth_headers(token),
    ).json()
    client.post(
        f"/api/gardens/{garden['id']}/plants/{plant['id']}/entries",
        json={"notes": "新长叶片", "photo_url": "https://example.com/photo.jpg"},
        headers=auth_headers(token),
    )
    task = client.post(
        f"/api/gardens/{garden['id']}/plants/{plant['id']}/care-tasks",
        json={"task_type": "浇水", "frequency_days": 3},
        headers=auth_headers(token),
    ).json()
    client.post(
        f"/api/gardens/{garden['id']}/plants/{plant['id']}/care-tasks/{task['id']}/events",
        json={"note": "例行浇水"},
        headers=auth_headers(token),
    )
    # Manually backdate last completed to simulate即将到期
    update = client.post(
        f"/api/gardens/{garden['id']}/plants/{plant['id']}/care-tasks/{task['id']}/events",
        json={"note": "补记", "performed_at": (datetime.utcnow() - timedelta(days=4)).isoformat()},
        headers=auth_headers(token),
    )
    assert update.status_code == 201
    return token


def test_garden_dashboard_requires_auth(client):
    """Composite garden endpoint should demand authentication."""

    response = client.get("/api/garden")
    assert response.status_code == 401


def test_garden_dashboard_payload(client):
    """Ensure the garden dashboard aggregates plants, tasks and stats."""

    token = _bootstrap_garden(client)
    response = client.get("/api/garden", headers=auth_headers(token))
    assert response.status_code == 200
    payload = response.json()
    assert payload["stats"]["total_gardens"] == 1
    assert payload["stats"]["total_plants"] == 1
    assert payload["tasks"], "should include care tasks"
    assert payload["gardens"][0]["plants"][0]["timeline"], "timeline should surface growth entries"


def test_assistant_flow(client):
    """Users can ask the assistant and retrieve the conversation history."""

    register_user(client, email="assistant@example.com")
    token = login_user(client, email="assistant@example.com")
    ask = client.post(
        "/api/assistant",
        json={"question": "月季叶子发黄怎么办？"},
        headers=auth_headers(token),
    )
    assert ask.status_code == 201
    body = ask.json()
    assert "叶片发黄" in body["message"]["answer"]

    history = client.get("/api/assistant", headers=auth_headers(token))
    assert history.status_code == 200
    messages = history.json()
    assert len(messages) == 1
    assert messages[0]["question"].startswith("月季")
