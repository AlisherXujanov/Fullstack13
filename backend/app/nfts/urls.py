from django.urls import path
from .views import *


# https://www.mysite.com/

urlpatterns = [
    path("", landing_page, name="landing_page"),
    path("faq/", faq, name="faq"),
    path('logout/', custom_logout, name='custom_logout'),
    path('create-nft/', create_nft, name='create_nft'),
    path('update-nft/<int:pk>/', update_nft, name='update_nft'),
    path('delete-nft/<int:pk>/', delete_nft, name='delete_nft'),
    path('explore', ExploreView.as_view(), name='explore'),
    path('explore/nft/<int:pk>', nft_details, name='nft_details'),

    path("add-to-favorites/<int:pk>/", add_to_favorites, name="add_to_favorites"),
    path("remove-from-favorites/<int:pk>/", remove_from_favorites, name="remove_from_favorites"),
]
