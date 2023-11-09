from django.shortcuts import render
from .models import Movie, Article, Banners, ST88project
from rest_framework import generics
from .serializers import ArticleCardSerializer, MovieSerializer, ArticleSerializer, BannersSerializer, ProjectCardSerializer, ProjectSerializer, MovieCardSerializer
from django.db.models import Count
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_multiple_model.views import FlatMultipleModelAPIView
from drf_multiple_model.pagination import MultipleModelLimitOffsetPagination
from station88back.settings import REST_FRAMEWORK
from django.db.models import Avg
from django.db.models import ExpressionWrapper, DecimalField


class BannersListView(generics.ListAPIView):
    serializer_class = BannersSerializer
    queryset = Banners.objects.all()
    pagination_class = None

class MovieListView(generics.ListAPIView):
    serializer_class = MovieCardSerializer
    queryset = Movie.objects.annotate(avg_rating=Avg("ST88descriptions__rating")).all().order_by('-release_date')

@api_view(['GET'])
def movie_detail(request, url):
    try:
        movie = Movie.objects.prefetch_related('ST88descriptions__author__profile').get(url=url)
    except Movie.DoesNotExist:
        return Response({'message': 'Проект не найден'})
    if request.method == 'GET':
        movie_serializer = MovieSerializer(movie)
        return Response(movie_serializer.data)

class ArticleListView(generics.ListAPIView):
    serializer_class = ArticleCardSerializer
    queryset = Article.objects.prefetch_related(
        'authors__profile', 'article_type').all().order_by('-release_date')

@api_view(['GET'])
def article_detail(request, url):
    try:
        article = Article.objects.get(url=url)
    except Article.DoesNotExist:
        return Response({'message': 'Статья не нейдена'})
    if request.method == 'GET':
        article_serializer = ArticleSerializer(article)
        return Response(article_serializer.data)

class ProjectListView(generics.ListAPIView):
    queryset = ST88project.objects.all().order_by('-year')
    serializer_class = ProjectCardSerializer


@api_view(['GET'])
def project_detail(request, url):
    try:
        project = ST88project.objects.get(url=url)
    except ST88project.DoesNotExist:
        return Response({'message': 'Фильм не найден'})
    if request.method == 'GET':
        project_serializer = ProjectSerializer(project)
        return Response(project_serializer.data)


class LimitPagination(MultipleModelLimitOffsetPagination):
    default_limit = REST_FRAMEWORK['PAGE_SIZE']
    # default_limit = 2


class PostsListView(FlatMultipleModelAPIView):
    pagination_class = LimitPagination
    sorting_fields = ['-release_date']
    querylist = [
        {'queryset': Movie.objects.annotate(avg_rating=Avg("ST88descriptions__rating")).all().order_by('-release_date'),
         'serializer_class': MovieCardSerializer,
         'label': 'movie'},
        {'queryset': Article.objects.prefetch_related(
        'authors__profile', 'article_type').all().order_by('-release_date'),
         'serializer_class': ArticleCardSerializer,
         'label': 'article'},
        {'queryset': ST88project.objects.all().order_by('-release_date'),
         'serializer_class': ProjectCardSerializer,
         'label': 'project'},
    ]









