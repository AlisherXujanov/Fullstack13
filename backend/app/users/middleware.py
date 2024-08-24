from django.utils import timezone
from django.conf import settings
from .models import Profile, Messages

class UserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated:


            if messages := Messages.objects.filter(owner=request.user, seen=False).exclude(sender=request.user):
                if len(messages) > 0:
                    request.session['has_unread_messages'] = True
                    request.session['unread_messages_ids'] = [msg.id for msg in messages]
            else:
                request.session['has_unread_messages'] = False
                request.session['unread_messages_ids'] = []


            user_profile = Profile.objects.get(user=request.user)
            user_profile.last_activity = timezone.now()
            user_profile.save()
        return response
