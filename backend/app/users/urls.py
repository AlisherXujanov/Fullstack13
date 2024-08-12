from django.urls import path
from .views import *

urlpatterns = [
    path('login/',CustomLoginView.as_view(),name='login'),
    path('signup/', CustomSignupView.as_view(), name='signup'),
]