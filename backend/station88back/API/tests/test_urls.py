from django.urls import reverse, resolve
from ..views import MovieListView, ArticleListView, BannersListView, movie_detail, article_detail, PostsListView

def test_url_get_movies():
    url = reverse('movies')
    assert resolve(url).func.view_class == MovieListView

def test_url_get_articles():
    url = reverse('articles')
    assert resolve(url).func.view_class == ArticleListView

def test_url_get_banners():
    url = reverse('banners')
    assert resolve(url).func.view_class == BannersListView

def test_url_get_posts():
    url = reverse('posts')
    assert resolve(url).func.view_class == PostsListView

def test_url_get_movie_detail():
    url = reverse('movie', args=['some_movie'])
    assert resolve(url).func == movie_detail

def test_url_get_article_detail():
    url = reverse('article', args=['some_article'])
    assert resolve(url).func == article_detail