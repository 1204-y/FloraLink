"""Plant species API tests."""

def test_create_and_list_species(client):
    """Species can be created and retrieved via the API."""

    payload = {
        "common_name": "Rose",
        "scientific_name": "Rosa",
        "sunlight": "Full sun",
        "watering": "Moderate",
        "description": "Classic climbing rose",
    }
    create_response = client.post("/api/plants/species", json=payload)
    assert create_response.status_code == 201, create_response.text
    created = create_response.json()
    assert created["common_name"] == "Rose"

    list_response = client.get("/api/plants/species")
    assert list_response.status_code == 200
    items = list_response.json()
    assert any(item["id"] == created["id"] for item in items)
