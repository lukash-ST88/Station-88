from django.shortcuts import render
from .models import Movie, Article, Banners
from rest_framework import generics
from .serializers import MovieSerializer, ArticleSerializer, BannersSerializer

def get_list_movies(request):
    movies = Movie.objects.all()
    return render(request, 'movies.html', {'movies': movies})

def get_movie_detail(request, movie_slug):
    movie = Movie.objects.get(url=movie_slug)
    return render(request, 'movie_detail.html', {'movie': movie})


class MovieListView(generics.ListAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.prefetch_related('ST88descriptions').all()

class ArticleListView(generics.ListAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.prefetch_related('article_type').all()

class BannersListView(generics.ListAPIView):
    serializer_class = BannersSerializer
    queryset = Banners.objects.all()
    