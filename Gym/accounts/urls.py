from django.urls import path
from .views import signup_view, admin_register_view, admin_login_view, login_view, logout_view

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('admin-register/', admin_register_view, name='admin_register'),
    path('admin_login', admin_login_view, name='admin_login'),
    path('user_login', login_view, name='user_login'),
    path('user_logout', logout_view, name='logout')
    
    
]