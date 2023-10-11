from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, null=True)
    last_name = models.CharField(max_length=100, null=True)
    role = models.CharField(max_length=250, default=None, null=True)

    class Meta:
        verbose_name = "Профиль"
        verbose_name_plural = "Профили"

    def __str__(self):
        return self.last_name
    
class Movie(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название')
    original_title = models.CharField(max_length=255, verbose_name='Оригинальное название')
    url = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='URL')
    poster = models.ImageField(upload_to='movie/posters/', verbose_name='Постер')
    year = models.IntegerField(verbose_name='Год')
    director = models.CharField(max_length=255, verbose_name='Режиссёр')
    genre = models.CharField(max_length=50, verbose_name='Жанр')
    music = models.FileField(null=True, upload_to='movie/music/', verbose_name='Музыка')
    link = models.CharField(max_length=500, verbose_name='Ссылка на трейлер', null=True)
    release_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации', null=True)

    class Meta:
        verbose_name = "Фильм"
        verbose_name_plural = "Фильмы"

    def __str__(self):
        return self.title
    
    # def save(self, *args, **kwargs): 
    #     self.slug = slugify(self.name)
    #     super(Project, self).save(*args, **kwargs) 
    

   
    # rating imdb KinoPoisk api 

class ST88rating(models.Model):
    rating = models.SmallIntegerField(verbose_name="Рейтинг по версии ST88")
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='ST88ratings', verbose_name='Автор')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='ST88ratings', verbose_name='Фильм')

    class Meta:
        verbose_name = "СТ88 Рейтинг"
        verbose_name_plural = "СТ88 Рейтинги"

    def __str__(self):
        return f'{self.author} - {self.movie} : {self.rating} '

class ST88description(models.Model):
    description = models.TextField(verbose_name="Описание по версии ST88")
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='ST88descriptions', verbose_name='Автор', null=True)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='ST88descriptions', verbose_name='Фильм')

    class Meta:
        verbose_name = "СТ88 описание"
        verbose_name_plural = "СТ88 описания"

    def __str__(self):
        return f'{self.author} - {self.movie}'
    

class Frame(models.Model):
    title = models.CharField(max_length=150, verbose_name='Название кадра')
    image = models.ImageField(upload_to='movie/frames/', verbose_name='Кадр')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, verbose_name='Фильм', related_name='frames')

    class Meta:
        verbose_name = "Кадр"
        verbose_name_plural = "Кадры"

    def __str__(self):
        return self.title
    
    

class Article(models.Model):
    title = models.CharField(max_length=100, verbose_name="Заголовок")
    url = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='URL')
    subtitle = models.CharField(max_length=100, verbose_name="Подзаголовок")
    authors = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='articles', verbose_name='Авторы')
    release_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата выпуска')
    article_type = models.ManyToManyField('ArticleType', verbose_name="Тип статьи", related_name="articles")
    poster = models.ImageField(upload_to='article/posters/', verbose_name='Постер')
    content = models.TextField(verbose_name="Контент", null=True)
    # краткое содержание

    class Meta:
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"

    def __str__(self):
        return self.title
    



class ArticleType(models.Model):
    title = models.CharField(max_length=100, verbose_name="Название", unique=True)
    url = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='URL')
    description = models.TextField(null=True, verbose_name="Описание")
    photo = models.ImageField(upload_to='article/types/', verbose_name='Фото типа статьи')

    class Meta:
        verbose_name = "Тип статьи"
        verbose_name_plural = "Типы статей"

    def __str__(self):
        return self.title
    


class Scenario(models.Model):
    title = models.CharField(max_length=150, verbose_name="Название")
    synopsys = models.TextField(verbose_name="Синопсис")
    text = models.FileField(upload_to='scenario/texts/', verbose_name='Текст')
    authors = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name='Авторы', related_name="scenarios")
    poster = models.ImageField(upload_to='scenario/posters/', verbose_name='Постер')
    

    class Meta:
        verbose_name = "Сценарий"
        verbose_name_plural = "Сценарии"

    def __str__(self):
        return self.title
    

class ProjectPresentation(models.Model):
    title = models.CharField(max_length=100, verbose_name="Название")
    synopsys = models.TextField()
    presentation_file = models.FileField(null=True, upload_to='project/presentation/', verbose_name='Презентация проекта')
    author = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name='Авторы', related_name='ProjectPrsentations')
    poster = models.ImageField(upload_to='scenario/posters/', verbose_name='Постер')

    class Meta:
        verbose_name = "Презентация проекта"
        verbose_name_plural = "Презентации проектов"

    def __str__(self):
        return self.title
    

class ST88project(models.Model):
    title = models.CharField(max_length=100, verbose_name="Название")
    year = models.IntegerField(verbose_name="Год" )
    synopsys = models.TextField(verbose_name="")
    scenario = models.OneToOneField(Scenario, verbose_name="Сценарий", related_name="ST88_project", on_delete=models.SET_NULL, null=True)
    # team = ArrayField(base_field=)
    authors = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name='Авторы', related_name='ST88_projects')
    downloaded_film = models.FileField(upload_to='ST88/projects/', verbose_name='Загруженный фильм', null=True)
    linked_film = models.CharField(max_length=500, verbose_name="Ссылка на фильм")
    poster = models.ImageField(upload_to='scenario/posters/', verbose_name='Постер')

    class Meta:
        verbose_name = "СТ88 Проект"
        verbose_name_plural = "СТ88 Проекты"

    def __str__(self):
        return self.title
    
class Review(models.Model):
    email = models.EmailField(verbose_name='Email')
    nickname = models.CharField(max_length=255, verbose_name='Имя', null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Пользователь', related_name='reviews', null=True, on_delete=models.SET_NULL)
    text = models.TextField(verbose_name='Комментарий')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, verbose_name='Родительский комментарий', related_name='children', null=True)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, verbose_name='Фильм', related_name='comments', null=True)
    scenario = models.ForeignKey(Scenario, on_delete=models.CASCADE, verbose_name='Сценарий', related_name='comments', null=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, verbose_name='Статья', related_name='comments', null=True)
    ST88_project = models.ForeignKey(ST88project, on_delete=models.CASCADE, verbose_name='СТ88 Проект', related_name='comments', null=True)
    project_presentation = models.ForeignKey(ProjectPresentation, on_delete=models.CASCADE, verbose_name='Презентация проекта', related_name='comments', null=True)
    
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


#TODO: team array
#TODO: rating API KinoPoisk IMDB
#TODO: slugify 
#TODO: custom user model
#TODO: default release_date for articles








    