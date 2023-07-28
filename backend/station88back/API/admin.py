from django.contrib import admin
from .models import Movie, Article, ArticleType, Review, Scenario, ST88description, ST88project, ST88rating, ProjectPresentation

admin.site.register(Movie)
admin.site.register(Article)
admin.site.register(ArticleType)
admin.site.register(Review)
admin.site.register(Scenario)
admin.site.register(ST88description)
admin.site.register(ST88project)
admin.site.register(ST88rating)
admin.site.register(ProjectPresentation)

admin.site.site_title = 'Станция 88'
admin.site.site_header = 'Станция 88'
