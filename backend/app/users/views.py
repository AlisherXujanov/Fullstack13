from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Profile, Messages
from django.shortcuts import render
from allauth.account.views import LoginView, SignupView
from .forms import *
from nfts.models import NFTs
from .usecases import *
import json


class CustomLoginView(LoginView):
    form_class = CustomLoginForm
    template_name = 'account/login.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['latest_nfts'] = NFTs.objects.order_by('-created_at')[:4]
        return context


class CustomSignupView(SignupView):
    form_class = CustomSignupForm
    template_name = 'account/signup.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['latest_nfts'] = NFTs.objects.order_by('-created_at')[:4]
        return context


@login_required
def profile_page(request, pk):
    obj = Profile.objects.get(user__pk=pk)
    context = {
        "obj": obj,
    }
    return render(request, "profile_page.html", context)


# get_chat_messages
# get_last_message_between

@login_required
def messages(request, pk: int):
    target_user_profile = Profile.objects.get(user__pk=pk)
    target_user = None if request.user.id == pk else target_user_profile.user
    chat_messages = get_chat_messages(request, request.user, target_user)

    formatted_last_login = target_user_profile.user.last_login.strftime(
        "%d %b %Y, %H:%M:%S")

    context = {
        "target_user_profile": target_user_profile,
        "target_user_is_active": is_user_online(target_user_profile.user),
        "target_user_last_login": formatted_last_login,
        "friends": get_friends(request),
        "my_saved_messages": True if target_user == None else False,
        "saved_messages": get_myself_as_friend_profile(request),
        "chat_messages": chat_messages,
    }
    set_all_messages_as_seen(request.user, target_user)
    return render(request, "messages.html", context)


@login_required
def ajax_create_message(request):
    if request.headers.get('X-CSRFToken') and request.method == "POST":
        target_user_profile_id = json.loads(request.body)['target_user_profile_id']
        message_text = json.loads(request.body)['message_text']
        profile_obj = Profile.objects.get(pk=target_user_profile_id) 
        Messages.objects.create(content=message_text, owner=profile_obj.user, sender=request.user)
        data = {'success': True}
        return JsonResponse(data)
    return JsonResponse({'error': 'Invalid request'}, status=401)


@login_required
def deleteMessage(request):
    # JSON.stringify()   ===  json.dumps()
    # JSON.parse()   ===  json.loads()

    if request.headers.get('X-CSRFToken') and request.method == "POST":
        msg_id = json.loads(request.body)['message_id']
        message_obj = Messages.objects.get(pk=msg_id)
        message_obj.delete()
        data = {'success': True}
        return JsonResponse(data)
    return JsonResponse({'error': 'Invalid request'}, status=401)
