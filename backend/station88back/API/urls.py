from django.urls import path, include
from .views import get_list_movies, get_movie_detail


urlpatterns = [
    path('movies/', get_list_movies),
    path('movies/<slug:movie_slug>', get_movie_detail)
]
