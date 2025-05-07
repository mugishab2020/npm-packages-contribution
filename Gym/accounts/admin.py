from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'username', 'phone','user_type', 'is_staff', 'is_superuser')
    list_filter = ('user_type', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password', 'user_type')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Personal Info', {'fields': ('phone', 'profile_picture')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'user_type', 'password1', 'password2', 'is_staff', 'is_superuser')}
        ),
    )
    search_fields = ('email', 'username')
    ordering = ('email',)

admin.site.register(CustomUser, CustomUserAdmin)
