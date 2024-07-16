from django.urls import path
from .views import *

urlpatterns = [
    path("", users, name='users'),
    path("profile/<int:pk>/", profile_page, name='profile_page'),
]
