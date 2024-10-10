from .models import NFTs, NFTComments
from rest_framework import serializers
from users.serializers import ProfileSerializer

DISCOUNT_IN_PERCENT = 10

class NFTsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    # price_in_discount = serializers.SerializerMethodField(method_name='price_after_discount')
    
    class Meta:
        model = NFTs
        fields = ["id", "name", "price", "description", "image", "owner", "liked_by"]
        
    # def price_after_discount(self, obj:NFTs):
    #     discount_price = obj.price - (obj.price * DISCOUNT_IN_PERCENT / 100)
    #     return f'${discount_price} - ({DISCOUNT_IN_PERCENT}% discount)'


class CommentsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    profile = ProfileSerializer(read_only=True, required=False)
    
    class Meta:
        model = NFTComments
        fields = '__all__'
        # fields = ["id", "nft", "user_profile", "content", "likes", "created_at", "updated_at"]
    
    




# class NFTsSerializer(serializers.Serializer):
#     name = serializers.CharField(max_length=50)
#     description = serializers.CharField()
#     price = serializers.DecimalField(max_digits=10, decimal_places=2)
#     # owner = serializers.IntegerField()
#     image = serializers.ImageField()
#     # liked_by = serializers.ListField(child=serializers.IntegerField())

#     class Meta:
#         model = NFTs
#         fields = ["name", "description", "price", "image"]
