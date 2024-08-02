from django.urls import path
from .views import *


# https://www.mysite.com/

urlpatterns = [
    path("faq/", faq, name="faq"),
]
