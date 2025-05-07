from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class SignUpForm(UserCreationForm):
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        })
    )
    phone = forms.CharField(
        max_length=15,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        })
    )
    usertype = forms.ChoiceField(
        choices=CustomUser.USER_TYPE,
        label="User Type",
        widget=forms.Select(attrs={
            'class': 'w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        })
    )
    profile_picture = forms.ImageField(
        required=False,
        widget=forms.ClearableFileInput(attrs={
            'class': 'w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
        })
    )

    class Meta:
        model = CustomUser
        fields = [
            'username', 'email', 'password1', 'password2',
            'phone', 'usertype', 'profile_picture'
        ]
        widgets = {
            'username': forms.TextInput(attrs={
                'class': 'w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            }),
            'password1': forms.PasswordInput(attrs={
                'class': 'w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            }),
            'password2': forms.PasswordInput(attrs={
                'class': 'w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            }),
        }

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.phone = self.cleaned_data['phone']
        user.usertype = self.cleaned_data['usertype']
        if self.cleaned_data['profile_picture']:
            user.profile_picture = self.cleaned_data['profile_picture']
        if commit:
            user.save()
        return user
