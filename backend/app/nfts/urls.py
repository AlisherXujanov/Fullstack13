from django.urls import path
from .views import *


# https://www.mysite.com/

urlpatterns = [
    path("", landing_page, name="landing_page"),
    path('logout/', custom_logout, name='custom_logout'),
]
