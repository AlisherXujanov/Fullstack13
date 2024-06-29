from django.urls import path
from .views import *

urlpatterns = [
    path("cars/", cars_view, name='cars_view'),
]


