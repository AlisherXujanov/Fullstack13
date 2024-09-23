"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import *
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns
from rest_framework.authtoken.views import obtain_auth_token
from nfts.api_views import *
from users.api_views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('apis/', api_views.hello_world),
    path('apis/products', NFTListCreateView.as_view()),
    path('apis/products/<int:pk>/', SingleNFTsView.as_view()),
    path('auth/users/profile', ProfileView.as_view()),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    

    
    path('accounts/', include('allauth.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += i18n_patterns(
    path("", include('users.urls')),
    path("", include("nfts.urls")),
    path('about-us/', about_us, name='about_us'),
    path('become-artist/', become, name='become_artist'),
    path('contact-us/', contact_us, name='contact_us'),
)