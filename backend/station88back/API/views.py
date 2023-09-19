from django.shortcuts import render
from .models import Movie, Article, Banners
from rest_framework import generics
from .serializers import MovieSerializer, ArticleSerializer, BannersSerializer
from django.db.models import Count
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.decorators import api_view
from rest_framework.response import Response

def get_list_movies(request):
    movies = Movie.objects.all()
    return render(request, 'movies.html', {'movies': movies})

def get_movie_detail(request, movie_slug):
    movie = Movie.objects.get(url=movie_slug)
    return render(request, 'movie_detail.html', {'movie': movie})


class MovieListView(generics.ListAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.prefetch_related('ST88descriptions').all()
    # pagination_class = None
    # def list(self, request):
    #     queryset = self.get_queryset()
    #     serializer = MovieSerializer(queryset, many=True)
    #     count = len(serializer.data)
    #     return Response(self.serializer_class(queryset, many=True, headers={'x-total-count':count}).data)
 

class ArticleListView(generics.ListAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.prefetch_related('article_type').all()

class BannersListView(generics.ListAPIView):
    serializer_class = BannersSerializer
    queryset = Banners.objects.all()
    pagination_class = None
    
@api_view(['GET'])    
def movie_detail(request, url):
    try:
        movie = Movie.objects.get(url=url)
    except Movie.DoesNotExist:
        return  Response({'massage': 'Фильм не найден'})
    if request.method == 'GET':
        movie_serializer = MovieSerializer(movie)
        return Response(movie_serializer.data)
