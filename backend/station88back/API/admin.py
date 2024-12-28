from typing import Any
from django.contrib import admin
from django import forms
from .models import Movie, Article, ArticleType, Review, Scenario, ST88description, ST88project, ProjectPresentation, \
    Banners, Profile, Frame, Book, FreePost, Sliders
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from django.utils.html import mark_safe
from django.db.models import Q


# widget for CKeditor
class ArticleContentAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Article
        fields = '__all__'


class ArticleAdmin(admin.ModelAdmin):
    form = ArticleContentAdminForm
    list_display = ['title', 'subtitle']
    search_fields = ['title']
    prepopulated_fields = {"url": ("title",)}


class ArticleTypeAdmin(admin.ModelAdmin):
    prepopulated_fields = {"url": ("title",)}


class ST88descriptionDescriptionAdminForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget, required=False)

    class Meta:
        model = ST88description
        fields = '__all__'


class ST88descriptionInline(admin.StackedInline):
    model = ST88description
    extra = 0
    form = ST88descriptionDescriptionAdminForm


class ST88descriptionAdmin(admin.ModelAdmin):
    form = ST88descriptionDescriptionAdminForm



class FrameInline(admin.TabularInline):
    model = Frame
    extra = 0
    readonly_fields = ('get_image',)

    def get_image(self, obj):
        if obj.image:
            return mark_safe(f"<img src='{obj.image.url}' height=75 width=auto>")

    get_image.short_description = 'Кадр'


# class ST88ratingInline(admin.TabularInline):
#     model = ST88rating
#     extra = 0

class MovieAdmin(admin.ModelAdmin):
    list_display = ['title', 'original_title', 'year']
    # custom_list_filter = ['year']
    search_fields = ['title', 'original_title']
    prepopulated_fields = {"url": ("title",)}
    readonly_fields = ['poster_preview']
    inlines = [ST88descriptionInline, FrameInline]
    save_on_top = True

    def poster_preview(self, obj):
        if obj.poster:
            return mark_safe(f"<img src='{obj.poster.url}' height=auto width=200>")

    poster_preview.short_description = 'Постер обзор'


class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'original_title', 'year']
    search_fields = ['title', 'original_title']
    prepopulated_fields = {"url": ("title",)}
    readonly_fields = ['poster_preview']
    inlines = [ST88descriptionInline, ]
    save_on_top = True

    def poster_preview(self, obj):
        if obj.poster:
            return mark_safe(f"<img src='{obj.poster.url}' height=auto width=200>")

    poster_preview.short_description = 'Постер обзор'


class FreePostContentAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = FreePost
        fields = '__all__'


class FreePostAdmin(admin.ModelAdmin):
    form = FreePostContentAdminForm
    prepopulated_fields = {"url": ("title",)}





class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = "Профили"


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = [ProfileInline]


# class ST88ratingAdmin(admin.ModelAdmin):
#     readonly_fields = ('description', )
#     def save_model(self, request: Any, obj: Any, form: Any, change: Any) -> None:
#         try:
#             description = ST88description.objects.get(Q(movie=obj.movie) & Q(author=obj.author))
#             print(description)
#         except ST88description.DoesNotExist:
#             obj.description = None
#             super().save_model(request, obj, form, change)
#         else:
#             super().save_model(request, obj, form, change)
#             description.rating = obj
#             description.save()


# class ST88descriptionAdmin(admin.ModelAdmin):
#     readonly_fields = ('rating', )
#     def save_model(self, request: Any, obj: Any, form: Any, change: Any) -> None:
#         try:
#             rating = ST88rating.objects.get(Q(movie=obj.movie) & Q(author=obj.author))
#         except ST88rating.DoesNotExist:
#             obj.rating = None
#         else:
#             obj.rating = rating
#         return super().save_model(request, obj, form, change)


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Movie, MovieAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(ArticleType, ArticleTypeAdmin)
admin.site.register(FreePost, FreePostAdmin)
admin.site.register(Review)
admin.site.register(Scenario)
admin.site.register(ST88description, ST88descriptionAdmin)
admin.site.register(ST88project)
# admin.site.register(ST88rating)
admin.site.register(ProjectPresentation)
admin.site.register(Banners)
admin.site.register(Sliders)
admin.site.register(Profile)

admin.site.site_title = 'Станция 88'
admin.site.site_header = 'Станция 88'
