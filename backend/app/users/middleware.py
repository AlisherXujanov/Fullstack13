from django.utils import timezone
from django.conf import settings
from .models import Profile


class UpdateLastActivityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated:
            user_profile = Profile.objects.get(user=request.user)
            user_profile.last_activity = timezone.now()
            user_profile.save()
        return response
