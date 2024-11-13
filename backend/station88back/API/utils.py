from rest_framework import pagination

class ArticleTypePagination(pagination.PageNumberPagination):
       page_size = 1000