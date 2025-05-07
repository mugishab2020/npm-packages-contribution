from django.db import models
from accounts.models import CustomUser

class WorkoutSession(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    CATEGOTY_TYPES = (
        ('cardio', 'Cardio'),
        ('strength', 'Strength'),
        ('yoga', 'Yoga'),
        ('hiit', 'HIIT'),
    )

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='booked_sessions')
    trainer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='trainer_sessions', limit_choices_to={'user_type': 'trainer'})
    workout_type = models.CharField(max_length=45, choices=CATEGOTY_TYPES)
    session_date = models.DateField()
    session_time = models.TimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} with {self.trainer.username} on {self.session_date} at {self.session_time}"

from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'

    def __str__(self):
        return self.title
