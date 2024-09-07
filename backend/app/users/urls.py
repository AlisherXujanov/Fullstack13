from django.urls import path
from .views import *

urlpatterns = [
    path("login/", CustomLoginView.as_view(), name="login"),
    path("signup/", CustomSignupView.as_view(), name="signup"),
    path("profile/<int:pk>/", profile_page, name="profile_page"),
    path("messages/<int:pk>/", messages, name="messages_page"),
    path("change_translation/<str:lang_code>/", change_translation, name="change_translation"),

    # AJAX calls
    path('delete-message/', deleteMessage, name='deleteMessage'),
    path('ajax-create-message/', ajax_create_message, name='ajax_create_message'),
]
