from .models import Profile
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth.models import User


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username', 'password', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True},
        }


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]



class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = UserSerializer(required=False)

    class Meta:
        model = Profile
        fields = '__all__'


