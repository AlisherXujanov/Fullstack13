import sys
import os
from PIL import Image
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta


# Create your models here.


class Messages(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner',
                              help_text='The user who received the message')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender',
                               help_text='The user who sent the message')
    content = models.TextField(help_text='The content of the message')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    seen = models.BooleanField(
        default=False, help_text='Whether the message has been read by the owner')

    
    def updated_after_creation(self) -> bool:
        return self.created_at != self.updated_at


    def __str__(self) -> str:
        return f"Message of {self.sender.username} to {self.owner.username}"


    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'


# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to='profile_pics/', default='profile_pics/default.png')
    last_activity = models.DateTimeField(default=timezone.now)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.request = None

    def __str__(self):
        return f'{self.user.username} Profile'


    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path)
        if img.height > 500 or img.width > 500:
            output_size = (500, 500)
            img.thumbnail(output_size)
            img.save(self.image.path)

    def delete(self, *args, **kwargs):
        # DELETE ACTUAL FILE
        if os.path.isfile(self.image.path):
            os.remove(self.image.path)
        else:
            print("Error: %s file not found" % self.image.path)
            sys.exit(1)

        super().delete(*args, **kwargs)
