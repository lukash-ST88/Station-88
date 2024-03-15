from django.urls import path, include, re_path
from .views import MovieListView, MovieSortedListView, ArticleListView, BannersListView, movie_detail, article_detail, \
    PostsListView, ProjectListView, project_detail, user_detail, book_detail, free_post_detail

urlpatterns = [
    path('movies', MovieListView.as_view(), name='movies'),
    path('movies/sort/<str:sort>', MovieSortedListView.as_view(), name='sorted-movies'),
    path('movie/<slug:url>', movie_detail, name='movie'),
    path('book/<slug:url>', book_detail, name='book'),
    path('articles', ArticleListView.as_view(), name='articles'),
    path('article/<slug:url>', article_detail, name='article'),
    path('projects', ProjectListView.as_view(), name='projects'),
    path('project/<slug:url>', project_detail, name='project'),
    path('free-post/<slug:url>', free_post_detail, name='free-post'),
    path('banners', BannersListView.as_view(), name='banners'),
    path('posts', PostsListView.as_view(), name='posts'),
    path('user/<str:username>', user_detail, name='user'),
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]
