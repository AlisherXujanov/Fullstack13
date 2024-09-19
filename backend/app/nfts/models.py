# models.py
from django.db import models
from django.contrib.auth.models import User
from PIL import Image


class NFTs(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='nfts/', default='nfts/Salin1.png')
    liked_by = models.ManyToManyField(User, related_name='liked_nfts', blank=True)

    class Meta:
        db_table = 'nfts'
        verbose_name = 'NFT'
        verbose_name_plural = 'NFTs'
        ordering = ['-created_at']
        # permissions = [('can_change_nft', 'Can change NFT')]

    def __str__(self) -> str:
        return self.name
    
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.image.path)
        if img.height > 700 or img.width > 700:
            output_size = (700, 700)
            img.thumbnail(output_size)
            img.save(self.image.path)

