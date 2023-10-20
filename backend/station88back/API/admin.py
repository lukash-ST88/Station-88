from django.contrib import admin
from django import forms
from .models import Movie, Article, ArticleType, Review, Scenario, ST88description, ST88project, ST88rating, ProjectPresentation, Banners, Profile, Frame
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from django.utils.html import mark_safe


# widget for CKeditor
class ArticleContentAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Article
        fields = '__all__'


class ArticleAdmin(admin.ModelAdmin):
    form = ArticleContentAdminForm

class ST88descriptionInline(admin.StackedInline):
    model = ST88description
    extra = 0

class FrameInline(admin.TabularInline):
    model = Frame
    extra = 0
    readonly_fields = ('get_image',)

    def get_image(self, obj):
        if obj.image:
            return mark_safe(f"<img src='{obj.image.url}' height=75 width=auto>")
    get_image.short_description = 'Кадр'

class ST88ratingInline(admin.TabularInline):
    model = ST88rating
    extra = 0
    
class MovieAdmin(admin.ModelAdmin):
    list_display = ['title', 'original_title', 'year']
    # custom_list_filter = ['year']
    search_fields = ['title', 'original_title']
    prepopulated_fields = {"url": ("title", )}
    readonly_fields = ['poster_preview']
    inlines = [ST88descriptionInline, ST88ratingInline, FrameInline]
    save_on_top = True


    def poster_preview(self, obj):
        if obj.poster:
            return mark_safe(f"<img src='{obj.poster.url}' height=auto width=200>")
        
    poster_preview.short_description = 'Постер обзор'

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = "Профили"


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = [ProfileInline]



admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Movie, MovieAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(ArticleType)
admin.site.register(Review)
admin.site.register(Scenario)
admin.site.register(ST88description)
admin.site.register(ST88project)
admin.site.register(ST88rating)
admin.site.register(ProjectPresentation)
admin.site.register(Banners)
admin.site.register(Profile)

admin.site.site_title = 'Станция 88'
admin.site.site_header = 'Станция 88'
