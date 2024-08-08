from django.urls import path
from .views import *


# https://www.mysite.com/

urlpatterns = [
    path("", landing_page, name="landing_page"),
    path('logout/', custom_logout, name='custom_logout'),
    path('create-nft/', create_nft, name='create_nft'),
    path('update-nft/<int:pk>/', update_nft, name='update_nft'),
    path('explore', explore, name='explore'),
    path('explore/nft/<int:pk>', nft_page, name='nft_page')
]
