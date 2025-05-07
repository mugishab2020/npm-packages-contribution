from django.contrib import admin
from .models import Category, BlogPost

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'content', 'category')
    search_fields = ('title', 'category')
    ordering= ['title']
    list_filter =('content', 'title')




admin.site.register(Category)
admin.site.register(BlogPost, BlogPostAdmin)