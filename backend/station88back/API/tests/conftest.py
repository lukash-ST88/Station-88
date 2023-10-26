import pytest
from pytest_factoryboy import register
from .factories import MovieFactory, UserFactory, ST88descriptionFactory, ST88ratingFactory
from rest_framework.test import APIClient



register(MovieFactory)
register(UserFactory)
register(ST88ratingFactory)
register(ST88descriptionFactory)



@pytest.fixture(scope='session')
def api_client():
    return APIClient()
