from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'index.html')

def profile_view(request):

    return render(request, 'profile.html')
def blog_view(request):
    return render(request, 'blog.html')
def tips_view(request):
    return render(request, 'tips.html')
def location_view(request):
    return render(request, 'location.html')
def schedule_view(request):
    return render(request, 'schedule.html')
def trainer_view(request):
    return render(request, 'trainer.html')