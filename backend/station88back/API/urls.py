from django.urls import path, include
from .views import get_list_movies, get_movie_detail, MovieListView, ArticleListView, BannersListView


urlpatterns = [
    path('movies/', get_list_movies),
    path('movies/<slug:movie_slug>', get_movie_detail),
    path('API/movies', MovieListView.as_view(), name='movies'),
    path('API/articles', ArticleListView.as_view(), name='articles'),
    path('API/banners', BannersListView.as_view(), name='banners')
]
