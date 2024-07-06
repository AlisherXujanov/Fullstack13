from django.urls import path
from .views import *

urlpatterns = [
    path("cars/", cars_view, name='cars_view'),
    path("create-car/", create_car_view, name='create_car_view'),
    path("update-car/<int:pk>", update_car_view, name='update_car_view'),
]


