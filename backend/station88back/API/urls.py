from django.urls import path, include, re_path
from .views import MovieListView, MovieSortedListView, ArticleListView, BannersListView, movie_detail, article_detail, \
    PostsListView, ProjectListView, project_detail, user_detail, book_detail, free_post_detail, ArticleTypeListView, \
    ArticleSortedListView, ArticlesFilteredListView, MovieFilteredListView, PostsFilteredListView, UserTeamListView, \
    ArticleByUserListView, MovieByUserListView, ProjectByUserListView, MovieByUserAndTitleListView, \
    ArticleByUserAndTitleListView, ProjectByUserAndTitleListView

urlpatterns = [
    path('movies', MovieListView.as_view(), name='movies'),
    path('movies/user/<str:username>', MovieByUserListView.as_view(), name='movies-by-user'),
    path('movies/user/<str:username>/title/<str:title>', MovieByUserAndTitleListView.as_view(), name='movies-by-user-title'),
    path('movies/sort/<str:sort>', MovieSortedListView.as_view(), name='sorted-movies'),
    path('movies/filters', MovieFilteredListView.as_view(), name='filtered-movies'),
    path('movie/<slug:url>', movie_detail, name='movie'),
    path('book/<slug:url>', book_detail, name='book'),
    path('articles', ArticleListView.as_view(), name='articles'),
    path('articles/user/<str:username>', ArticleByUserListView.as_view(), name='articles-by-user'),
    path('articles/user/<str:username>/title/<str:title>', ArticleByUserAndTitleListView.as_view(), name='articles-by-user-title'),
    path('articles/sort/<str:sort>', ArticleSortedListView.as_view(), name='sorted-articles'),
    path('articles/filters', ArticlesFilteredListView.as_view(), name="filtered-articles"),
    path('article/<slug:url>', article_detail, name='article'),
    path('article-types', ArticleTypeListView.as_view(), name='article-types'),
    path('projects', ProjectListView.as_view(), name='projects'),
    path('projects/user/<str:username>', ProjectByUserListView.as_view(), name='projects-by-user'),
    path('projects/user/<str:username>/title/<str:title>', ProjectByUserAndTitleListView.as_view(), name='projects-by-user-title'),
    path('project/<slug:url>', project_detail, name='project'),
    path('free-post/<slug:url>', free_post_detail, name='free-post'),
    path('banners', BannersListView.as_view(), name='banners'),
    path('posts', PostsListView.as_view(), name='posts'),
    path('posts/filters', PostsFilteredListView.as_view(), name="filtered-posts"),
    path('user/<str:username>', user_detail, name='user'),
    path('users/team', UserTeamListView.as_view(), name='user-team'),
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]
