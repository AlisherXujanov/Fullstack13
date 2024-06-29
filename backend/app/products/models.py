from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Cars(models.Model):
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    color = models.CharField(max_length=50)
    price = models.IntegerField()
    author_of_ad = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Car'
        verbose_name_plural = 'Cars'
        ordering = ['-created_at']
