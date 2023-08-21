from django.urls import path, include
from .views import get_list_movies, get_movie_detail, MovieListView, ArticleListView


urlpatterns = [
    path('movies/', get_list_movies),
    path('movies/<slug:movie_slug>', get_movie_detail),
    path('API/movies', MovieListView.as_view(), name='movies'),
    path('API/articles', ArticleListView.as_view(), name='articles')
]
