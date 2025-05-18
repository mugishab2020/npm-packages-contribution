from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class UserModel(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    second_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    age = models.IntegerField()
    address = models.CharField(max_length=255)
    password =  models.CharField(max_length=255)

    def __str__(self):
        return self.email

class ProductModel(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.name