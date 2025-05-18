from django.urls import path
from .views import login_view, registerView, homeview, logout_view, update_user_data, uploadProduct, show_product

urlpatterns = [
    path('', login_view, name='login'),
    path('register', registerView, name='register'),
    path('home', homeview, name='home'),
    path('logout', logout_view, name='logout'),
    path('update/', update_user_data, name='update'),
    path('AddProduct', uploadProduct, name='AddProduct'),
    path('showproduct',show_product, name='ShowProduct' ),
]
