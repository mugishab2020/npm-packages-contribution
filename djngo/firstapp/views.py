from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import UserModel, ProductModel
from .forms import UserForm, LoginForm, UserUpdateForm, ProductForm

# Create your views here.def login_view(request):
def homeview(request):
    return render(request, 'home.html')
def login_view(request):
    form = LoginForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            try:
                user = UserModel.objects.get(email=email)
                user = authenticate(request, username=user.username, password=password)
                if user is not None:
                    login(request, user)
                    messages.success(request, 'Logged in successfully.')
                    return redirect('home')
                else:
                    messages.error(request, 'Invalid credentials.')
            except UserModel.DoesNotExist:
                messages.error(request, 'User with this email does not exist.')

    return render(request, 'login.html', {'form': form})

def logout_view(request):
    logout(request)
    messages.success(request, 'Logged out successfully.')
    return redirect('login')


def registerView(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserForm()
    
    return render(request, 'register.html', {'formdata': form})
@login_required(login_url='/api/login')
def update_user_data(request):
    user = request.user  # Current logged-in user

    if request.method == 'POST':
        form = UserUpdateForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your account info was updated successfully.')
            return redirect('update')  # Or another page
    else:
        form = UserUpdateForm(instance=user)  # Pre-fill with current data

    return render(request, 'update_user.html', {'form': form})

def uploadProduct(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()

            return redirect('home')
        
    else:
        form = ProductForm()
        messages.error(request, 'Invalid form data.')
    return render(request, 'postproduct.html', {'form': form})

def show_product(request):
    products = ProductModel.objects.all()
    return render(request, 'showproduct.html', {'products': products})