from rest_framework import serializers
from .models import Movie, Article, ArticleType, Scenario, ST88description, ST88project, ST88rating, ProjectPresentation, Review, Banners
from django.contrib.auth.models import User

class CurrentUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.CharField()

    class Meta:
        model = User
        fields = ('username', 'email')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

class ST88ratingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ST88rating
        fields = "__all__"


class ST88descriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ST88description
        fields = "__all__"

class MovieSerializer(serializers.ModelSerializer):
    ST88descriptions = ST88descriptionSerializer(many=True, read_only=True)
    ST88ratings = ST88ratingSerializer(many=True, read_only=True)
    comments = ReviewSerializer(many=True, read_only=True)


    class Meta:
        model = Movie
        fields = ['id', 'title', 'original_title', 'url', 'poster', 
                  'year','director', 'genre', 'music', 'link', 
                  'ST88descriptions', 'ST88ratings', 'comments', 'release_date']
        
class ArticleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleType
        fields = "__all__"

class ArticleSerializer(serializers.ModelSerializer):
    # article_type = ArticleTypeSerializer(many=True, read_only=True)
    article_type = serializers.StringRelatedField(many=True)
    authors = CurrentUserSerializer(many=True, read_only=True)
    # authors = serializers.SlugRelatedField(many=True, read_only=True, slug_field='username')

    class Meta:
        model = Article
        fields = ['id', 'title', 'url', 'subtitle', 'authors', 'release_date', 'article_type', 'poster', 'content']

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

    class Meta:
        model = ST88project
        fields = "__all__"

