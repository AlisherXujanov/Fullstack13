from django.utils import timezone
from .models import Profile, Messages
from django.http import HttpResponseForbidden
from django.utils.translation import get_language

class UserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        current_language = get_language()
        request.session['current_language'] = current_language
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





ALLOWED_IPS = ['127.0.0.1', '192.168.0.100']

class AdminAccessMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/admin/') and request.META['REMOTE_ADDR'] not in ALLOWED_IPS:
            return HttpResponseForbidden("You are not allowed to access this page.")    

        # ---------------- OR ----------------
        # CHECK IF USER IS SUPERUSER
        # if request.path.startswith('/admin/') and not request.user.is_superuser:
        #     return redirect('home')  # Redirect to home or any other page
        # ------------------------------------

        # ---------------- OR ----------------
        # BOTH CHECKS INCLUDED
        # if request.path.startswith('/admin/') and (request.META['REMOTE_ADDR'] not in ALLOWED_IPS or not request.user.is_superuser):
        #     return HttpResponseForbidden("You are not allowed to access this page.")
        # ------------------------------------
        return self.get_response(request)