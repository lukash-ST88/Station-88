from rest_framework import serializers
from .models import Movie, Article, ArticleType, Scenario, ST88description, ST88project, ProjectPresentation, Review, \
    Banners, Profile, Book, FreePost
from django.contrib.auth.models import User

""" -----------Users--------- """


class ProfileSerializer(serializers.Serializer):
    last_name = serializers.CharField()
    first_name = serializers.CharField()
    role = serializers.CharField()
    avatar = serializers.ImageField()

    class Meta:
        model = Profile
        fields = ['last_name', 'first_name', 'role', 'avatar']


class CustomUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.CharField()
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'profile')


""" ----------PrefetchesForBase---------- """


class MoviePrefetchForBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'url']


class ArticlePrefetchForBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'url']


""" ----------Cards---------- """


class MovieCardSerializer(serializers.ModelSerializer):
    avg_rating = serializers.DecimalField(decimal_places=1, max_digits=3)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'original_title',
                  'url', 'poster', 'year', 'release_date', 'avg_rating']


class BookCardSerializer(serializers.ModelSerializer):
    avg_rating = serializers.DecimalField(decimal_places=1, max_digits=3)

    class Meta:
        model = Book
        fields = ['id', 'title', 'original_title',
                  'url', 'poster', 'year', 'release_date', 'avg_rating']


class ArticleCardSerializer(serializers.ModelSerializer):
    article_type = serializers.StringRelatedField(many=True, read_only=True)
    authors = CustomUserSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        exclude = ['content']


class ProjectCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ST88project
        fields = ['id', 'title', 'year', 'url', 'poster', 'release_date']


class FreePostCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = FreePost
        exclude = ['content']


""" ----------Base---------- """


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class ST88descriptionSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    movie = serializers.CharField()
    book = serializers.CharField()

    class Meta:
        model = ST88description
        fields = ['description', 'author', 'release_date', 'movie', 'book', 'id', 'rating']


class MovieSerializer(serializers.ModelSerializer):
    ST88descriptions = ST88descriptionSerializer(many=True, read_only=True)
    comments = ReviewSerializer(many=True, read_only=True)
    related_articles = ArticlePrefetchForBaseSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'original_title', 'url', 'poster',
                  'year', 'director', 'genre', 'music', 'link',
                  'ST88descriptions', 'comments', 'release_date', 'related_articles']


class BookSerializer(serializers.ModelSerializer):
    ST88descriptions = ST88descriptionSerializer(many=True, read_only=True)
    comments = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'original_title', 'url', 'poster',
                  'year', 'writer', 'genre', 'ST88descriptions', 'comments', 'release_date', 'ebook']


class ArticleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleType
        fields = "__all__"


class ArticleSerializer(serializers.ModelSerializer):
    article_type = ArticleTypeSerializer(many=True, read_only=True)
    # article_type = serializers.StringRelatedField(many=True)
    authors = CustomUserSerializer(many=True, read_only=True)
    related_movies = MoviePrefetchForBaseSerializer(many=True, read_only=True)

    # authors = serializers.SlugRelatedField(many=True, read_only=True, slug_field='username')

    class Meta:
        model = Article
        fields = ['id', 'title', 'url', 'subtitle', 'authors',
                  'release_date', 'article_type', 'poster', 'content', 'related_movies']


class BannersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banners
        fields = "__all__"


class ScenarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scenario
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    scenario = ScenarioSerializer(read_only=True)
    authors = CustomUserSerializer(many=True, read_only=True)

    class Meta:
        model = ST88project
        fields = "__all__"


class FreePostSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)

    class Meta:
        model = FreePost
        fields = "__all__"
