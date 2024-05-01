from django.shortcuts import render
from .models import Movie, Article, Banners, ST88project, Book, FreePost
from rest_framework import generics
from .serializers import ArticleCardSerializer, MovieSerializer, ArticleSerializer, BannersSerializer, \
    ProjectCardSerializer, ProjectSerializer, MovieCardSerializer, CustomUserSerializer, BookCardSerializer, \
    BookSerializer, FreePostSerializer, FreePostCardSerializer
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
from django.contrib.auth.models import User


class BannersListView(generics.ListAPIView):
    serializer_class = BannersSerializer
    queryset = Banners.objects.all()
    pagination_class = None


""" ---------- Movies ---------- """


class MovieListView(generics.ListAPIView):
    serializer_class = MovieCardSerializer
    queryset = Movie.objects.annotate(avg_rating=Avg(
        "ST88descriptions__rating")).all().order_by('-release_date')


class MovieSortedListView(generics.ListAPIView):
    serializer_class = MovieCardSerializer

    def get_queryset(self):
        return Movie.objects.annotate(avg_rating=Avg("ST88descriptions__rating")).all().order_by(self.kwargs['sort'])


@api_view(['GET'])
def movie_detail(request, url):
    try:
        movie = Movie.objects.prefetch_related(
            'ST88descriptions__author__profile').get(url=url)
    except Movie.DoesNotExist:
        return Response({'message': 'Фильм не найден'})
    if request.method == 'GET':
        movie_serializer = MovieSerializer(movie)
        return Response(movie_serializer.data)


""" ---------- Articles ---------- """


class ArticleListView(generics.ListAPIView):
    serializer_class = ArticleCardSerializer
    queryset = Article.objects.prefetch_related(
        'authors__profile', 'article_type').all().order_by('-release_date')


@api_view(['GET'])
def article_detail(request, url):
    try:
        article = Article.objects.prefetch_related(
            'authors__profile').get(url=url)
    except Article.DoesNotExist:
        return Response({'message': 'Статья не нейдена'})
    if request.method == 'GET':
        article_serializer = ArticleSerializer(article)
        return Response(article_serializer.data)


""" ---------- Projects ---------- """


class ProjectListView(generics.ListAPIView):
    queryset = ST88project.objects.all().order_by('-year')
    serializer_class = ProjectCardSerializer


""" ---------- Books ---------- """


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
def book_detail(request, url):
    try:
        book = Book.objects.prefetch_related(
            'ST88descriptions__author__profile').get(url=url)
    except Book.DoesNotExist:
        return Response({'message': 'Книга не найдена'})
    if request.method == 'GET':
        book_serializer = BookSerializer(book)
        return Response(book_serializer.data)


""" ---------- Free Posts ---------- """


@api_view(['GET'])
def free_post_detail(request, url):
    try:
        free_post = FreePost.objects.prefetch_related(
            'author__profile').get(url=url)
    except FreePost.DoesNotExist:
        return Response({'message': 'Пост не нейден'})
    if request.method == 'GET':
        free_post_serializer = FreePostSerializer(free_post)
        return Response(free_post_serializer.data)


""" ---------- Users ---------- """


@api_view(['GET'])
def user_detail(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'message': 'Пользователь не определен'})
    if request.method == 'GET':
        user_serializer = CustomUserSerializer(user)
        return Response(user_serializer.data)


""" ---------- Posts ---------- """


class LimitPagination(MultipleModelLimitOffsetPagination):
    default_limit = REST_FRAMEWORK['PAGE_SIZE']


class PostsListView(FlatMultipleModelAPIView):
    pagination_class = LimitPagination
    sorting_fields = ['-release_date']
    querylist = [
        {'queryset': Movie.objects.annotate(avg_rating=Avg("ST88descriptions__rating")).all().order_by('-release_date'),
         'serializer_class': MovieCardSerializer,
         'label': 'movie'},
        {'queryset': Book.objects.annotate(avg_rating=Avg("ST88descriptions__rating")).all().order_by('-release_date'),
         'serializer_class': BookCardSerializer,
         'label': 'book'},
        {'queryset': Article.objects.prefetch_related(
            'authors__profile', 'article_type').all().order_by('-release_date'),
         'serializer_class': ArticleCardSerializer,
         'label': 'article'},
        {'queryset': ST88project.objects.all().order_by('-release_date'),
         'serializer_class': ProjectCardSerializer,
         'label': 'project'},
        {'queryset': FreePost.objects.all().order_by('-release_date'),
         'serializer_class': FreePostSerializer,
         'label': 'free_post'},
    ]
