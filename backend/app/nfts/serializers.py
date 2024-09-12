from .models import NFTs
from rest_framework import serializers



class NFTsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFTs
        fields = ['id', 'name', 'description', 'price']



