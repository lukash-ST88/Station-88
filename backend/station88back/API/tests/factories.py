import factory
from ..models import Movie, ST88rating, ST88description
from django.contrib.auth.models import User
from faker import Factory as FakerFactory
from faker import Faker
from django.utils import timezone

faker = FakerFactory.create()
fake = Faker()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = faker.name()
    password = faker.password()
    email = faker.email()



class MovieFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Movie
    
    title = fake.pystr()
    original_title = fake.pystr()
    url = fake.url()
    poster = factory.django.ImageField()
    year = fake.pyint()
    director = fake.pystr()
    genre = fake.pystr()
    music = factory.django.FileField(filename='music')
    link = fake.url()


class ST88ratingFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ST88rating
    
    rating = fake.pyint(max_value=5)
    author = factory.SubFactory(UserFactory)
    movie = factory.SubFactory(MovieFactory)

class ST88descriptionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ST88description
    
    description = fake.sentence()
    author = factory.SubFactory(UserFactory)
    movie = factory.SubFactory(MovieFactory)
    release_date = timezone.now()
