from django.urls import path, include, re_path
from .views import get_list_movies, get_movie_detail, MovieListView, ArticleListView, BannersListView, movie_detail, article_detail, PostsListView, get_posts


urlpatterns = [
    path('movies/', get_list_movies),
    path('movies/<slug:movie_slug>', get_movie_detail),
    path('movies', MovieListView.as_view(), name='movies'),
    path('articles', ArticleListView.as_view(), name='articles'),
    path('banners', BannersListView.as_view(), name='banners'),
    path('movie/<slug:url>', movie_detail, name='movie'),
    path('article/<slug:url>', article_detail, name='article'),
    path('posts',  PostsListView.as_view(), name='posts'),
    path('post_list', get_posts, name='po'),
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]
