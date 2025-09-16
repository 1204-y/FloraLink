"""Community interaction tests."""
from .utils import auth_headers, login_user, register_user


def test_group_creation_and_posts(client):
    """Users can create groups, join them and share posts."""

    register_user(client, email="founder@example.com")
    founder_token = login_user(client, email="founder@example.com")

    group_response = client.post(
        "/api/communities/groups",
        json={"name": "Chengdu Bloom Club", "city": "Chengdu", "topic": "Roses"},
        headers=auth_headers(founder_token),
    )
    assert group_response.status_code == 201, group_response.text
    group_id = group_response.json()["id"]

    founder_post = client.post(
        f"/api/communities/groups/{group_id}/posts",
        json={"title": "Spring meetup", "content": "Let's visit the botanical garden."},
        headers=auth_headers(founder_token),
    )
    assert founder_post.status_code == 201

    register_user(client, email="member@example.com")
    member_token = login_user(client, email="member@example.com")

    join_response = client.post(
        f"/api/communities/groups/{group_id}/join",
        headers=auth_headers(member_token),
    )
    assert join_response.status_code == 200

    member_post = client.post(
        f"/api/communities/groups/{group_id}/posts",
        json={"title": "Nursery recommendation", "content": "There's a great shop near downtown."},
        headers=auth_headers(member_token),
    )
    assert member_post.status_code == 201

    posts_response = client.get(f"/api/communities/groups/{group_id}/posts")
    posts = posts_response.json()
    assert len(posts) == 2
    titles = {post["title"] for post in posts}
    assert {"Spring meetup", "Nursery recommendation"}.issubset(titles)
