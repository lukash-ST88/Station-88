from rest_framework import serializers
from .models import Movie, Article, ArticleType, Scenario, ST88description, ST88project, ST88rating, ProjectPresentation, Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

class ST88rating88Serializer(serializers.ModelSerializer):
    class Meta:
        model = ST88rating
        fields = "__all__"


class ST88descriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ST88description
        fields = "__all__"

class MovieSerializer(serializers.ModelSerializer):
    ST88descriptions = ST88descriptionSerializer(many=True, read_only=True)
    ST88ratings = ST88rating88Serializer(many=True, read_only=True)
    comments = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'original_title', 'url', 'poster', 
                  'year','director', 'genre', 'music', 'link', 
                  'ST88descriptions', 'ST88ratings', 'comments']
        
