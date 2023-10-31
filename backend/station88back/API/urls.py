from django.urls import path, include, re_path
from .views import MovieListView, ArticleListView, BannersListView, movie_detail, article_detail, PostsListView, ProjectListView, project_detail


urlpatterns = [
    path('movies', MovieListView.as_view(), name='movies'),
    path('movie/<slug:url>', movie_detail, name='movie'),
    path('articles', ArticleListView.as_view(), name='articles'),
    path('article/<slug:url>', article_detail, name='article'),
    path('projects', ProjectListView.as_view(), name='projects'),
    path('project/<slug:url>', project_detail, name='project'),
    path('banners', BannersListView.as_view(), name='banners'),
    path('posts',  PostsListView.as_view(), name='posts'),
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]
