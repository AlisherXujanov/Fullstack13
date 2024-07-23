from django.urls import path
from .views import *

urlpatterns = [
    path("cars/", CarsListView.as_view(), name='cars_view'),
    path("create-car/", create_car_view, name='create_car_view'),
    path("update-car/<int:pk>", update_car_view, name='update_car_view'),
    path("car-details/<int:pk>", car_details_view, name='car_details_view'),
    path("delete-car/<int:pk>", delete_car, name='delete_car'),
    path("delete-car-img/<int:pk>", delete_car_img, name='delete_car_img'),

    path("add-to-favorites/<int:product_id>", add_to_favorites, name='add_to_favorites'),
    path("remove-from-favorites/<int:product_id>", remove_from_favorites, name='remove_from_favorites'),
]
