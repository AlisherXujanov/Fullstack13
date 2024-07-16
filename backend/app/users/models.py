from django.db import models
from django.contrib.auth.models import User
from PIL import Image
import os
import sys

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to='profile_pics/', default='profile_pics/default.png')

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
