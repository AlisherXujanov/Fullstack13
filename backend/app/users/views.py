from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Profile, Messages
from django.shortcuts import render
from allauth.account.views import LoginView, SignupView
from .forms import *
from nfts.models import NFTs
from .usecases import get_chat_messages, get_friends, is_user_online, get_myself_as_friend_profile
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


@login_required
def messages(request, pk: int):
    target_user_profile = Profile.objects.get(user__pk=pk)

    if request.method == "POST":
        message = request.POST['message']
        Messages.objects.create(content=message, owner=target_user_profile.user, sender=request.user)
        

    target_user = None if request.user.id == pk else target_user_profile.user 
    chat_messages = get_chat_messages(request.user, target_user)
    # [
    #     {
    #         'day': 15, 'month': 8, 'year': 2024,
    #         'message': {
    #             'time': '05:40',
    #             'content': '...',
    #             'sender': 'companion'
    #         }
    #     },
    # ]
   
    formatted_last_login = target_user_profile.user.last_login.strftime(
        "%d %b %Y, %H:%M:%S")

    context = {
        "target_user_profile": target_user_profile,
        "target_user_is_active": is_user_online(target_user_profile.user),
        "target_user_last_login": formatted_last_login,
        "friends": get_friends(request.user),
        "my_saved_messages": True if target_user == None else False,
        "saved_messages": get_myself_as_friend_profile(request.user),
        "chat_messages": chat_messages,
    }
    return render(request, "messages.html", context)


@login_required
def deleteMessage(request):
    # JSON.stringify()   ===  json.dumps()
    # JSON.parse()   ===  json.loads()

    if request.headers.get('X-CSRFToken') and request.method == "POST":
        msg_id = json.loads(request.body)['message_id']
        message_obj = Messages.objects.get(pk=msg_id)
        message_obj.delete()
        data = { 'success': True }
        return JsonResponse(data)
    return JsonResponse({'error': 'Invalid request'}, status=401)
