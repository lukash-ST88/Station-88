from django.utils.datetime_safe import datetime
from djoser.serializers import UserSerializer

from .models import Movie, Article, Banners, ST88project, Book, FreePost, ArticleType
from rest_framework import generics
from .serializers import ArticleCardSerializer, MovieSerializer, ArticleSerializer, BannersSerializer, \
    ProjectCardSerializer, ProjectSerializer, MovieCardSerializer, CustomUserSerializer, BookCardSerializer, \
    BookSerializer, FreePostSerializer, FreePostCardSerializer, ArticleTypeCardSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_multiple_model.views import FlatMultipleModelAPIView
from drf_multiple_model.pagination import MultipleModelLimitOffsetPagination
from station88back.settings import REST_FRAMEWORK
from django.db.models import Avg
from django.contrib.auth.models import User

from .utils import ArticleTypePagination
from django.db.models import Q

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

class MovieFilteredListView(generics.ListAPIView):
    serializer_class = MovieCardSerializer

    def get_queryset(self):
        sort = self.request.query_params.get('sort') if self.request.query_params.get('sort') else "-release_date"
        search_characters = self.request.query_params.get('search_characters')
        start_year = int(self.request.query_params.get('start_year'))
        end_year = int(self.request.query_params.get('end_year'))

        queryset = []
        if search_characters and not start_year:
            queryset = (Movie.objects.annotate(avg_rating=Avg("ST88descriptions__rating"))
                        .filter(Q(title__icontains=search_characters) | Q(original_title__icontains=search_characters))
                        .order_by(sort))
        elif start_year and end_year and not search_characters:
            queryset = (Movie.objects.annotate(avg_rating=Avg("ST88descriptions__rating"))
                        .filter(Q(year__gte=start_year) & (Q(year__lte=end_year))).order_by(sort))
        elif start_year and end_year and search_characters:
            queryset = (Movie.objects.annotate(avg_rating=Avg("ST88descriptions__rating"))
                        .filter(Q(year__gte=start_year) & (Q(year__lte=end_year)) &
                                (Q(title__icontains=search_characters) | Q(original_title__icontains=search_characters)))
                        .order_by(sort))
        return queryset


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

class ArticleSortedListView(generics.ListAPIView):
    serializer_class = ArticleCardSerializer

    def get_queryset(self):
        return Article.objects.prefetch_related('authors__profile', 'article_type').all().order_by(self.kwargs['sort'])


class ArticlesFilteredListView(generics.ListAPIView):
    serializer_class = ArticleCardSerializer

    def get_queryset(self):
        sort = self.request.query_params.get('sort') if  self.request.query_params.get('sort') else "-release_date"
        category_slug = self.request.query_params.get('category_slug')
        search_characters = self.request.query_params.get('search_characters')
        start_date: datetime = self.request.query_params.get('start_date')
        end_date: datetime = self.request.query_params.get('end_date')
        is_date = all((start_date, end_date))

        queryset = []
        if category_slug and not search_characters and not is_date:
            queryset = (Article.objects.prefetch_related('authors__profile', 'article_type')
                    .filter(article_type__url=category_slug).order_by(sort))
        elif not category_slug and search_characters and not is_date:
            queryset = (Article.objects.prefetch_related('authors__profile', 'article_type')
                        .filter(Q(title__icontains=search_characters) | Q(subtitle__icontains=search_characters))
                        .order_by(sort))
        elif not category_slug and not search_characters and is_date:
            queryset = (Article.objects.prefetch_related('authors__profile', 'article_type')
                        .filter(Q(release_date__gte=start_date) & Q(release_date__lte=end_date))
                        .order_by(sort))
        elif not category_slug and search_characters and is_date:
            queryset = (Article.objects.prefetch_related('authors__profile', 'article_type')
                        .filter(Q(release_date__gte=start_date) & Q(release_date__lte=end_date)
                                & (Q(title__icontains=search_characters) | Q(subtitle__icontains=search_characters)))
                        .order_by(sort))
        elif category_slug and not search_characters and is_date:
            queryset = (Article.objects.prefetch_related('authors__profile', 'article_type')
                        .filter(Q(release_date__gte=start_date) & Q(release_date__lte=end_date) & Q(article_type__url=category_slug))
                        .order_by(sort))
        elif category_slug and search_characters and not is_date:
            queryset = (Article.objects.prefetch_related('authors__profile', 'article_type')
                        .filter(Q(article_type__url=category_slug),
                                (Q(title__icontains=search_characters) | Q(subtitle__icontains=search_characters)))
                        .order_by(sort))

        elif category_slug and search_characters and is_date:
            queryset = (Article.objects.prefetch_related('authors__profile', 'article_type')
                        .filter(Q(article_type__url=category_slug)
                                & Q(release_date__gte=start_date) & Q(release_date__lte=end_date)
                                & (Q(title__icontains=search_characters) | Q(subtitle__icontains=search_characters)))
                        .order_by(sort))
        return queryset

class ArticleTypeListView(generics.ListAPIView):
    serializer_class = ArticleTypeCardSerializer
    queryset = ArticleType.objects.all().order_by('title')
    pagination_class = ArticleTypePagination


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


@api_view(['GET'])
def project_detail(request, url):
    try:
        project = ST88project.objects.get(url=url)
    except ST88project.DoesNotExist:
        return Response({'message': 'Фильм не найден'})
    if request.method == 'GET':
        project_serializer = ProjectSerializer(project)
        return Response(project_serializer.data)


""" ---------- Books ---------- """


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


class UserTeamListView(generics.ListAPIView):
    serializer_class = CustomUserSerializer
    queryset = User.objects.filter(is_staff=True).order_by('profile__order')
    pagination_class = None



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


class LimitPaginationAllPosts(MultipleModelLimitOffsetPagination):
    default_limit = 6


class PostsListView(FlatMultipleModelAPIView):
    pagination_class = LimitPaginationAllPosts
    sorting_fields = ['-release_date']
    querylist = [
        {'queryset': Movie.objects.annotate(avg_rating=Avg("ST88descriptions__rating")).all().order_by('-release_date'),
         'serializer_class': MovieCardSerializer,
         'label': 'movie'},
        {'queryset': Book.objects.annotate(avg_rating=Avg("ST88descriptions__rating")).all().order_by('-release_date'),
         'serializer_class': BookCardSerializer,
         'label': 'book'},
        {'queryset': Article.objects.prefetch_related('authors__profile', 'article_type').all().order_by('-release_date'),
         'serializer_class': ArticleCardSerializer,
         'label': 'article'},
        {'queryset': ST88project.objects.all().order_by('-release_date'),
         'serializer_class': ProjectCardSerializer,
         'label': 'project'},
        {'queryset': FreePost.objects.all().order_by('-release_date'),
         'serializer_class': FreePostSerializer,
         'label': 'free_post'},
    ]




class PostsFilteredListView(FlatMultipleModelAPIView):
    pagination_class = LimitPaginationAllPosts
    sorting_field = '-release_date'


    def get_querylist(self):

        category = self.request.query_params.get('category')
        search_characters = self.request.query_params.get('search_characters')
        start_date: datetime = self.request.query_params.get('start_date')
        end_date: datetime = self.request.query_params.get('end_date')

        is_date = all((start_date, end_date))

        movies = []
        books = []
        articles = []
        projects = []
        freeposts = []

        if search_characters and not is_date:
            movies = (Movie.objects.annotate(avg_rating=Avg("ST88descriptions__rating"))
                        .filter(Q(title__icontains=search_characters) | Q(original_title__icontains=search_characters))
                        .order_by(self.sorting_field))
            books = (Book.objects.annotate(avg_rating=Avg("ST88descriptions__rating"))
                     .filter(Q(title__icontains=search_characters) | Q(original_title__icontains=search_characters))
                     .order_by(self.sorting_field))
            articles = (Article.objects.prefetch_related('authors__profile', 'article_type')
                        .filter(Q(title__icontains=search_characters) | Q(subtitle__icontains=search_characters))
                        .order_by(self.sorting_field))
            projects = ST88project.objects.filter(Q(title__icontains=search_characters)).order_by(self.sorting_field)
            freeposts = (FreePost.objects
                         .filter(Q(title__icontains=search_characters) | Q(subtitle__icontains=search_characters))
                         .order_by(self.sorting_field))
        elif not search_characters and is_date:
            movies = (Movie.objects.annotate(avg_rating=Avg("ST88descriptions__rating"))
                        .filter(Q(release_date__gte=start_date) & Q(release_date__lte=end_date))
                        .order_by(self.sorting_field))
            books = (Book.objects.annotate(avg_rating=Avg("ST88descriptions__rating"))
                     .filter(Q(release_date__gte=start_date) & Q(release_date__lte=end_date))
                     .order_by(self.sorting_field))
            articles = (Article.objects.prefetch_related('authors__profile', 'article_type')
                        .filter(Q(release_date__gte=start_date) & Q(release_date__lte=end_date))
                        .order_by(self.sorting_field))
            projects = (ST88project.objects
                        .filter(Q(release_date__gte=start_date) & Q(release_date__lte=end_date))
                        .order_by(self.sorting_field))
            freeposts = (FreePost.objects
                         .filter(Q(release_date__gte=start_date) & Q(release_date__lte=end_date))
                         .order_by(self.sorting_field))
        elif search_characters and is_date:
            movies = (Movie.objects.annotate(avg_rating=Avg("ST88descriptions__rating"))
                      .filter(Q(release_date__gte=start_date) & Q(release_date__lte=end_date)
                              & (Q(title__icontains=search_characters) | Q(original_title__icontains=search_characters)))
                      .order_by(self.sorting_field))
            books = (Book.objects.annotate(avg_rating=Avg("ST88descriptions__rating"))
                     .filter(Q(release_date__gte=start_date) & Q(release_date__lte=end_date)
                             & (Q(title__icontains=search_characters) | Q(original_title__icontains=search_characters)))
                     .order_by(self.sorting_field))
            articles = (Article.objects.prefetch_related('authors__profile', 'article_type')
                        .filter(Q(release_date__gte=start_date) & Q(release_date__lte=end_date)
                                & (Q(title__icontains=search_characters) | Q(subtitle__icontains=search_characters)))
                        .order_by(self.sorting_field))
            projects = (ST88project.objects
                        .filter(Q(release_date__gte=start_date) & Q(release_date__lte=end_date)
                                & Q(title__icontains=search_characters))
                        .order_by(self.sorting_field))
            freeposts = (FreePost.objects
                         .filter(Q(release_date__gte=start_date) & Q(release_date__lte=end_date)
                                 & (Q(title__icontains=search_characters) | Q(subtitle__icontains=search_characters)))
                         .order_by(self.sorting_field))
        elif not search_characters and not is_date:
            movies = Movie.objects.annotate(avg_rating=Avg("ST88descriptions__rating")).all().order_by(self.sorting_field)
            books = Book.objects.annotate(avg_rating=Avg("ST88descriptions__rating")).all().order_by(self.sorting_field)
            articles = Article.objects.prefetch_related('authors__profile', 'article_type').all().order_by(self.sorting_field)
            projects = ST88project.objects.all().order_by(self.sorting_field)
            freeposts = FreePost.objects.all().order_by(self.sorting_field)

        querylist = [
            {'queryset': movies,
             'serializer_class': MovieCardSerializer,
             'label': 'movie'},
            {'queryset': books,
             'serializer_class': BookCardSerializer,
             'label': 'book'},
            {'queryset': articles,
             'serializer_class': ArticleCardSerializer,
             'label': 'article'},
            {'queryset': projects,
             'serializer_class': ProjectCardSerializer,
             'label': 'project'},
            {'queryset': freeposts,
             'serializer_class': FreePostSerializer,
             'label': 'free_post'},
        ]

        if category:
            return [query for query in querylist if query['label'] == category]

        return querylist