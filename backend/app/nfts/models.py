from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class NFTs(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    # examples of price:
    # 1. 100.00
    # 2. 1000.00
    # 3. 10000.00
    # 4. 100000.00
    # ....
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # liked_people = [person1_id, ...]
    image = models.ImageField(upload_to='nfts/', default='nfts/Salin1.png')

    # IN PROFILE
    # liked_nfts = [nft1_id, ...]

    class Meta:
        db_table = 'nfts'
        verbose_name = 'NFT'
        verbose_name_plural = 'NFTs'
        ordering = ['-created_at']

    def __str__(self) -> str:
        return self.name
    
    