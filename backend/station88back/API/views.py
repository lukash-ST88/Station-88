from django.shortcuts import render
from .models import Movie

def get_list_movies(request):
    movies = Movie.objects.all()
    return render(request, 'movies.html', {'movies': movies})

def get_movie_detail(request, movie_slug):
    movie = Movie.objects.get(url=movie_slug)
    return render(request, 'movie_detail.html', {'movie': movie})