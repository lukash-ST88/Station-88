import pytest
from django.urls import reverse
from .factories import fake


@pytest.mark.django_db
def test_get_movies_request(api_client):
    url = reverse('movies')
    response = api_client.get(url)
    assert response.status_code == 200

@pytest.mark.django_db
def test_get_articles_request(api_client):
    url = reverse('articles')
    response = api_client.get(url)
    assert response.status_code == 200

@pytest.mark.django_db
def test_get_banners_request(api_client):
    url = reverse('banners')
    response = api_client.get(url)
    assert response.status_code == 200

@pytest.mark.django_db
def test_get_posts_request(api_client):
    url = reverse('posts')
    response = api_client.get(url)
    assert response.status_code == 200

@pytest.mark.django_db
def test_get_movie_request(api_client):
    url = reverse('movie', args=[fake.pystr()])
    response = api_client.get(url)
    assert response.status_code == 200

@pytest.mark.django_db
def test_get_article_request(api_client):
    url = reverse('article', args=[fake.pystr()])
    response = api_client.get(url)
    assert response.status_code == 200