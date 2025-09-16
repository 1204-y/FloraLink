"""Authentication flow tests."""
from floralink_backend.main import app  # noqa: F401  # Ensures app import for coverage

from .utils import login_user, register_user


def test_register_and_login(client):
    """Users can register and exchange credentials for an access token."""

    register_user(client, email="alice@example.com", password="supersecret")
    token = login_user(client, email="alice@example.com", password="supersecret")
    assert token
