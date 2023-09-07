from django.contrib import admin
from django import forms
from .models import Movie, Article, ArticleType, Review, Scenario, ST88description, ST88project, ST88rating, ProjectPresentation, Banners
from ckeditor_uploader.widgets import CKEditorUploadingWidget


# widget for CKeditor
class ArticleContentAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Article
        fields = '__all__'


class ArticleAdmin(admin.ModelAdmin):
    form = ArticleContentAdminForm


admin.site.register(Movie)
admin.site.register(Article, ArticleAdmin)
admin.site.register(ArticleType)
admin.site.register(Review)
admin.site.register(Scenario)
admin.site.register(ST88description)
admin.site.register(ST88project)
admin.site.register(ST88rating)
admin.site.register(ProjectPresentation)
admin.site.register(Banners)

admin.site.site_title = 'Станция 88'
admin.site.site_header = 'Станция 88'
