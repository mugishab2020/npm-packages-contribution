from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, phone=None, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not password:
            raise ValueError('The password must be set')
        email = self.normalize_email(email)
        extra_fields.setdefault('user_type', 'member')
        
        user = self.model(email=email, username=username, phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, phone=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('user_type', 'admin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, phone, password, **extra_fields)



class CustomUser(AbstractBaseUser, PermissionsMixin):
    USER_TYPE = (
        ('member', 'Member'),
        ('admin', 'Admin'),
        ('trainer', 'Trainer')
    )

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=255, null=False)
    phone = models.CharField(max_length=15, blank=True, null=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPE, default='member')
    profile_picture = models.ImageField(upload_to='images/', blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] 

    def __str__(self):
        return f"{self.username} ({self.user_type})"

class TrainerProfile(models.Model):
    user = models.OneToOneField('CustomUser', on_delete=models.CASCADE, related_name='trainer_profile')
    bio = models.TextField(blank=True)
    expertise = models.CharField(max_length=100)
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.user.expertise

