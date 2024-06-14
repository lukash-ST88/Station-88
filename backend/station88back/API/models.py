from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.text import slugify


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=100, null=True, verbose_name="Имя")
    last_name = models.CharField(max_length=100, null=True, verbose_name="Фамилия")
    role = models.CharField(max_length=250, default=None, null=True, blank=True, verbose_name="Роль")
    avatar = models.ImageField(
        upload_to='user/avatar/', verbose_name='Фото', null=True)

    class Meta:
        verbose_name = "Профиль"
        verbose_name_plural = "Профили"

    def __str__(self):
        return self.last_name


class Movie(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название')
    original_title = models.CharField(max_length=255, verbose_name='Оригинальное название', null=True, blank=True)
    url = models.SlugField(max_length=255, unique=True, db_index=True, blank=True, verbose_name='URL')
    poster = models.ImageField(upload_to='movie/posters/', verbose_name='Постер')
    main_frame = models.ImageField(upload_to='movie/main_frames/', null=True, verbose_name='Главный кадр')
    year = models.IntegerField(verbose_name='Год')
    director = models.CharField(max_length=255, verbose_name='Режиссёр')
    genre = models.CharField(max_length=50, verbose_name='Жанр')
    music = models.FileField(null=True, upload_to='movie/music/', verbose_name='Музыка', blank=True)
    link = models.CharField(max_length=500, verbose_name='Ссылка на трейлер', null=True, blank=True)
    release_date = models.DateTimeField(default=timezone.now, verbose_name='Дата публикации', null=True)
    related_articles = models.ManyToManyField('Article', verbose_name='Связанные статьи', related_name='related_movies', blank=True) 
    
    # def get_avg_rating_st88   
    class Meta:
        verbose_name = "Фильм"
        verbose_name_plural = "Фильмы"

    def __str__(self):
        return self.title

    # rating imdb KinoPoisk api


class ST88description(models.Model):
    description = models.TextField(verbose_name="Описание ST88", null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                               related_name='ST88descriptions', verbose_name='Автор', null=True)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE,
                              related_name='ST88descriptions', verbose_name='Фильм', null=True, blank=True)
    book = models.ForeignKey('Book', on_delete=models.CASCADE,
                              related_name='ST88descriptions', verbose_name='Книга', null=True, blank=True)
    release_date = models.DateTimeField(
        default=timezone.now, verbose_name='Дата публикации', null=True)
    # rating = models.OneToOneField(ST88rating, on_delete=models.SET_NULL, related_name='description', null=True, blank=True, verbose_name='Рейтинг')
    rating = models.SmallIntegerField(verbose_name="Рейтинг ST88", null=True, blank=True)

    class Meta:
        verbose_name = "СТ88 Описание и Рейтинг"
        verbose_name_plural = "СТ88 Описания и Рейтинги"

    def __str__(self):
        return f'{self.author} - {self.movie}'


class Frame(models.Model):
    title = models.CharField(max_length=150, verbose_name='Название кадра')
    image = models.ImageField(upload_to='movie/frames/', verbose_name='Кадр')
    movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE, verbose_name='Фильм', related_name='frames')

    class Meta:
        verbose_name = "Кадр"
        verbose_name_plural = "Кадры"

    def __str__(self):
        return self.title


class Article(models.Model):
    title = models.CharField(max_length=100, verbose_name="Заголовок")
    url = models.SlugField(max_length=255, unique=True,
                           db_index=True, verbose_name='URL')
    subtitle = models.CharField(max_length=100, verbose_name="Подзаголовок", blank=True, null=True)
    authors = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='articles', verbose_name='Авторы')
    release_date = models.DateTimeField(
        default=timezone.now, verbose_name='Дата публикации', null=True)
    article_type = models.ManyToManyField(
        'ArticleType', verbose_name="Тип статьи", related_name="articles")
    poster = models.ImageField(
        upload_to='article/posters/', verbose_name='Постер')
    content = models.TextField(verbose_name="Контент", null=True)
    synopsys = models.TextField(verbose_name="Краткое содержание", null=True, blank=True)

    class Meta:
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"

    def __str__(self):
        return self.title


class ArticleType(models.Model):
    title = models.CharField(
        max_length=100, verbose_name="Название", unique=True)
    url = models.SlugField(max_length=255, unique=True,
                           db_index=True, verbose_name='URL')
    description = models.TextField(null=True, verbose_name="Описание")
    photo = models.ImageField(
        upload_to='article/types/', verbose_name='Фото типа статьи')

    class Meta:
        verbose_name = "Тип статьи"
        verbose_name_plural = "Типы статей"

    def __str__(self):
        return self.title


class Scenario(models.Model):
    title = models.CharField(max_length=150, verbose_name="Название")
    synopsys = models.TextField(verbose_name="Синопсис")
    text = models.FileField(upload_to='scenario/texts/', verbose_name='Текст')
    authors = models.ManyToManyField(
        settings.AUTH_USER_MODEL, verbose_name='Авторы', related_name="scenarios")
    poster = models.ImageField(
        upload_to='scenario/posters/', verbose_name='Постер')
    release_date = models.DateTimeField(
        default=timezone.now, verbose_name='Дата публикации', null=True)

    class Meta:
        verbose_name = "Сценарий"
        verbose_name_plural = "Сценарии"

    def __str__(self):
        return self.title


class ProjectPresentation(models.Model):
    title = models.CharField(max_length=100, verbose_name="Название")
    synopsys = models.TextField()
    presentation_file = models.FileField(
        null=True, upload_to='project/presentation/', verbose_name='Презентация проекта')
    author = models.ManyToManyField(
        settings.AUTH_USER_MODEL, verbose_name='Авторы', related_name='ProjectPrsentations')
    poster = models.ImageField(
        upload_to='scenario/posters/', verbose_name='Постер')
    release_date = models.DateTimeField(
        default=timezone.now, verbose_name='Дата публикации', null=True)

    class Meta:
        verbose_name = "Презентация проекта"
        verbose_name_plural = "Презентации проектов"

    def __str__(self):
        return self.title


class ST88project(models.Model):
    title = models.CharField(max_length=100, verbose_name="Название")
    year = models.IntegerField(verbose_name="Год")
    genre = models.CharField(max_length=50, verbose_name='Жанр', null=True)
    length = models.IntegerField(verbose_name="Длительность (мин)", null=True)
    synopsys = models.TextField(verbose_name="Синопсис")
    scenario = models.OneToOneField(Scenario, verbose_name="Сценарий",
                                    related_name="ST88_project", on_delete=models.SET_NULL, null=True, blank=True)
    # team = ArrayField(base_field=)
    url = models.SlugField(max_length=255, unique=True,
                           db_index=True, verbose_name='URL', null=True)
    directors = models.ManyToManyField(
        settings.AUTH_USER_MODEL, verbose_name='Режиссёр', related_name='ST88_projects_director', blank=True)
    writers = models.ManyToManyField(
        settings.AUTH_USER_MODEL, verbose_name='Сценарист', related_name='ST88_projects_writer',  blank=True)
    cinematographers = models.ManyToManyField(
        settings.AUTH_USER_MODEL, verbose_name='Оператор', related_name='ST88_projects_cinematographer', blank=True)
    designers = models.ManyToManyField(
        settings.AUTH_USER_MODEL, verbose_name='Художник', related_name='ST88_projects_designer', blank=True)
    editors = models.ManyToManyField(
        settings.AUTH_USER_MODEL, verbose_name='Монтажёр', related_name='ST88_projects_editor', blank=True)
    actors = models.ManyToManyField(
        settings.AUTH_USER_MODEL, verbose_name='Актёры', related_name='ST88_projects_actor', blank=True)
    producers = models.ManyToManyField(
        settings.AUTH_USER_MODEL, verbose_name='Продюсер', related_name='ST88_projects_producer', blank=True)
    linked_trailer = models.CharField(
        max_length=500, verbose_name='Ссылка на трейлер', null=True, blank=True)
    linked_film = models.CharField(
        max_length=500, verbose_name="Ссылка на фильм", null=True, blank=True)
    poster = models.ImageField(
        upload_to='scenario/posters/', verbose_name='Постер')
    release_date = models.DateTimeField(
        default=timezone.now, verbose_name='Дата публикации', null=True)


    class Meta:
        verbose_name = "СТ88 Проект"
        verbose_name_plural = "СТ88 Проекты"

    def __str__(self):
        return self.title


class Banners(models.Model):
    title = models.CharField(max_length=255, verbose_name='Заголовок')
    description = models.TextField(verbose_name='Описание раздела')
    name = models.CharField(max_length=255, verbose_name='Название баннера')
    banner = models.ImageField(upload_to='banners/', verbose_name='Баннер')
    link = models.CharField(max_length=255, verbose_name='Ссылка', null=True)

    class Meta:
        verbose_name = "Баннер"
        verbose_name_plural = "Баннеры"

    def __str__(self):
        return self.title


class Course(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')
    link = models.CharField(max_length=255, verbose_name='Ссылка', null=True)

    class Meta:
        verbose_name = "Курсы"
        verbose_name_plural = "Курсы"

    def __str__(self):
        return self.title


class Education(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')
    authors = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='educations', verbose_name='Авторы')
    release_date = models.DateTimeField(
        default=timezone.now, verbose_name='Дата публикации', null=True)
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, verbose_name='Курс', related_name='educations', null=True)

    class Meta:
        verbose_name = "Образование"
        verbose_name_plural = "Образование"

    def __str__(self):
        return self.title


class Book(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название')
    original_title = models.CharField(max_length=255, verbose_name='Оригинальное название', blank=True, null=True)
    url = models.SlugField(max_length=255, unique=True, db_index=True, blank=True, verbose_name='URL')
    poster = models.ImageField(upload_to='book/posters/', verbose_name='Постер')
    year = models.IntegerField(verbose_name='Год')
    writer = models.CharField(max_length=255, verbose_name='Писатель')
    genre = models.CharField(max_length=50, verbose_name='Жанр')
    release_date = models.DateTimeField(default=timezone.now, verbose_name='Дата публикации', null=True)
    ebook = models.FileField(upload_to='book/ebooks/', verbose_name='Электронная книга', null=True, blank=True)

    class Meta:
        verbose_name = "Книга"
        verbose_name_plural = "Книги"

    def __str__(self):
        return self.title


class FreePost(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название')
    url = models.SlugField(max_length=255, unique=True,
                           db_index=True, verbose_name='URL')
    subtitle = models.CharField(max_length=100, verbose_name="Подзаголовок", blank=True)
    content = models.TextField(verbose_name="Контент", null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                               related_name='descriptions', verbose_name='Автор', null=True)
    release_date = models.DateTimeField(
        default=timezone.now, verbose_name='Дата публикации', null=True)
    poster = models.ImageField(
        upload_to='freepost/posters/', verbose_name='Постер', null=True, blank=True)

    class Meta:
        verbose_name = "Пост в свободной форме"
        verbose_name_plural = "Посты в свободной форме"

    def __str__(self):
        return f'{self.title}'


class Review(models.Model):
    email = models.EmailField(verbose_name='Email')
    nickname = models.CharField(max_length=255, verbose_name='Имя', null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Пользователь',
                             related_name='reviews', null=True, on_delete=models.SET_NULL)
    text = models.TextField(verbose_name='Комментарий')
    parent = models.ForeignKey('self', on_delete=models.CASCADE,
                               verbose_name='Родительский комментарий', related_name='children', null=True)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE,
                              verbose_name='Фильм', related_name='comments', null=True)
    scenario = models.ForeignKey(Scenario, on_delete=models.CASCADE,
                                 verbose_name='Сценарий', related_name='comments', null=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE,
                                verbose_name='Статья', related_name='comments', null=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE,
                             verbose_name='Книга', related_name='comments', null=True)
    ST88_project = models.ForeignKey(ST88project, on_delete=models.CASCADE,
                                     verbose_name='СТ88 Проект', related_name='comments', null=True)
    project_presentation = models.ForeignKey(
        ProjectPresentation, on_delete=models.CASCADE, verbose_name='Презентация проекта', related_name='comments',
        null=True)

    class Meta:
        verbose_name = "Комментарий"
        verbose_name_plural = "Комментарии"

    def __str__(self):
        if self.user:
            return f'{self.user}: {self.text}'
        elif self.nickname:
            return f'{self.nickname}: {self.text}'
        else:
            return f'{self.email}: {self.text}'

# TODO: team array
# TODO: rating API KinoPoisk IMDB
