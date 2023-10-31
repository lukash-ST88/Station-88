from django.shortcuts import render
from .models import Movie, Article, Banners, ST88project
from rest_framework import generics
from .serializers import MovieSerializer, ArticleSerializer, BannersSerializer, ProjectSerializer
from django.db.models import Count
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_multiple_model.views import FlatMultipleModelAPIView
from drf_multiple_model.pagination import MultipleModelLimitOffsetPagination
from station88back.settings import REST_FRAMEWORK


class MovieListView(generics.ListAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.prefetch_related(
        'ST88descriptions').all().order_by('-release_date')


class ArticleListView(generics.ListAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.prefetch_related(
        'authors', 'article_type').all().order_by('-release_date')


class BannersListView(generics.ListAPIView):
    serializer_class = BannersSerializer
    queryset = Banners.objects.all()
    pagination_class = None


class LimitPagination(MultipleModelLimitOffsetPagination):
    default_limit = REST_FRAMEWORK['PAGE_SIZE']
    # default_limit = 2


class PostsListView(FlatMultipleModelAPIView):
    pagination_class = LimitPagination
    sorting_fields = ['-release_date']
    querylist = [
        {'queryset': Movie.objects.all().order_by('-release_date'),
         'serializer_class': MovieSerializer,
         'label': 'movie'},
        {'queryset': Article.objects.all().order_by('-release_date'),
         'serializer_class': ArticleSerializer,
         'label': 'article'},
    ]


class ProjectListView(generics.ListAPIView):
    queryset = ST88project.objects.prefetch_related(
        'scenario').all().order_by('-year')
    serializer_class = ProjectSerializer


@api_view(['GET'])
def project_detail(request, url):
    try:
        project = ST88project.objects.get(url=url)
    except ST88project.DoesNotExist:
        return Response({'message': 'Фильм не найден'})
    if request.method == 'GET':
        project_serializer = ProjectSerializer(project)
        return Response(project_serializer.data)


@api_view(['GET'])
def movie_detail(request, url):
    try:
        movie = Movie.objects.get(url=url)
    except Movie.DoesNotExist:
        return Response({'message': 'Проект не найден'})
    if request.method == 'GET':
        movie_serializer = MovieSerializer(movie)
        return Response(movie_serializer.data)


@api_view(['GET'])
def article_detail(request, url):
    try:
        article = Article.objects.get(url=url)
    except Article.DoesNotExist:
        return Response({'message': 'Статья не нейдена'})
    if request.method == 'GET':
        article_serializer = ArticleSerializer(article)
        return Response(article_serializer.data)
