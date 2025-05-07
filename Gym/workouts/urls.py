from django.urls import path
from .views import home, profile_view, location_view, tips_view, blog_view, schedule_view, trainer_view

urlpatterns = [
    path('', home, name='home'),
    path('profile', profile_view, name='profile'),
    path('blog', blog_view, name='blog'),
    path('tips', tips_view, name='tips'),
    path('locations', location_view, name='location'),
    path('schedules', schedule_view, name='schedule'),
    path('trainers', trainer_view, name='trainers'),

]