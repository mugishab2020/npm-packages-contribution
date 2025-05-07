from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate,logout
from django.contrib import messages
from .forms import SignUpForm
from .models import CustomUser

def signup_view(request):
    form = SignUpForm()  # Initialize the form here

    if request.method == 'POST':
        form = SignUpForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')

    return render(request, 'accounts/signup.html', {'form': form})
def login_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid email or password')
            return redirect('user_login')
    return render(request, 'accounts/login.html')

def logout_view(request):
    logout(request)
    return redirect('user_login')
def admin_register_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        full_name = request.POST.get('full_name')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect('admin_register')

        if CustomUser.objects.filter(email=email).exists():
            messages.error(request, "Email already exists.")
            return redirect('admin_register')

        # Create admin user
        user = CustomUser.objects.create_user(
            email=email,
            full_name=full_name,
            password=password,
            user_type='admin'
        )
        user.save()
        messages.success(request, "Admin registered successfully.")
        return redirect('admin_login') 

    return render(request, 'accounts/admin_register.html')
def admin_login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('admin_dashboard') 
        else:
            messages.error(request, "Invalid credentials.")
            return redirect('admin_login') 

    return render(request, 'accounts/admin_login.html')

