from django.db import models
from django.contrib.auth.models import User
import json
from PIL import Image

# Create your models here.
class Cars(models.Model):
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    color = models.CharField(max_length=50)
    price = models.IntegerField()
    author_of_ad = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=255)
    likes = models.TextField(default='[]')
    image = models.ImageField(
        upload_to='cars/', default='cars/default.png')
    category = models.CharField(max_length=50)
    

    class Meta:
        verbose_name = 'Car'
        verbose_name_plural = 'Cars'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.brand} {self.model} {self.year}'

    def get_likes(self) -> list:
        return json.loads(self.likes)  # "[]"  ->  []

    def set_likes(self, user_id:int,  dislike=False) -> bool:
        all_likes = self.get_likes()  # []
        success = False
        if dislike:
            if user_id in all_likes:
                all_likes.remove(user_id)
                success = True
        else:
            if user_id not in all_likes:
                all_likes.append(user_id)
                success = True

        self.likes = json.dumps(all_likes)
        return success
            
        # if isinstance(user_ids, int):
        #     user_id = user_ids
        #     if user_id not in all_likes:
        #         all_likes.append(user_id)
        #         return True
        #     else:
        #         return False
        # elif isinstance(user_ids, list):
        #     for user_id in user_ids:
        #         if user_id not in all_likes:
        #             all_likes.append(user_id)
        #     return True


    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path)
        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)













# JSON.stringify()   ->   json.dumps()
# JSON.parse()       ->   json.loads()

# Cars.objects.filter(author_of_ad__username__endswith='...')
# Cars.objects.filter(author_of_ad__username__endswith='John').filter(
#     year__gt=1980) # -> list
# Cars.objects.all().exclude(author_of_ad__username__endswith='john')
# IceCream.objects.filter(sugar__lt=F('chocolate'), chocolate__gt=F('floor'))


# len(Cars.objects.all())  # -> 100000
# Cars.objects.count()    # -> 100000

# Here, len works relatively slow because it fetches all the objects
# from the database and then counts them.
# RU: Здесь len работает относительно медленно, потому что он извлекает все объекты
# из базы данных, а затем их считает.
# But, count works faster because it only counts the number of objects in the database.
# RU: Но count работает быстрее, потому что он только считает количество объектов в базе данных.
