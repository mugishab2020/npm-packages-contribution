from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import UserModel, ProductModel
class UserForm(UserCreationForm):
    class Meta:
        model = UserModel
        fields = ['username', 'email', 'first_name', 'second_name', 'phone_number', 'age', 'address', 'password1', 'password2']  # fields to be displayed in th
        widgets = {
            'username': forms.TextInput(attrs={
                'placeholder': 'Username',
                'class': 'w-full px-4 py-2 border rounded-md'
            }),
            'email': forms.EmailInput(attrs={
                'placeholder': 'Email address',
                'class': 'w-full px-4 py-2 border rounded-md'
            }),
            'first_name': forms.TextInput(attrs={
                'placeholder': 'First Name',
                'class': 'w-full px-4 py-2 border rounded-md'
            }),
            'second_name': forms.TextInput(attrs={
                'placeholder': 'Second Name',
                'class': 'w-full px-4 py-2 border rounded-md'
            }),
            'phone_number': forms.TextInput(attrs={
                'placeholder': 'Phone Number',
                'class': 'w-full px-4 py-2 border rounded-md'
            }),
            'age': forms.NumberInput(attrs={
                'placeholder': 'Age',
                'class': 'w-full px-4 py-2 border rounded-md'
            }),
            'address': forms.TextInput(attrs={
                'placeholder': 'Address',
                'class': 'w-full px-4 py-2 border rounded-md'
            }),
        }



class LoginForm(forms.Form):
    email = forms.EmailField(widget=forms.EmailInput(attrs={
        'class': 'w-full px-3 py-2 border rounded',
        'placeholder': 'Enter your email'
    }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'w-full px-3 py-2 border rounded',
        'placeholder': 'Enter your password'
    }))

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = UserModel
        fields = ['username', 'first_name', 'second_name', 'email']

class ProductForm(forms.ModelForm):
    class Meta:
        model = ProductModel
        fields = ['name', 'description', 'price']