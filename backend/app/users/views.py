from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Profile
from django.shortcuts import render
from allauth.account.views import LoginView, SignupView
from .forms import *
from nfts.models import NFTs
from .usecases import get_chat_messages


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
    target_user = Profile.objects.get(user__pk=pk)

    chat_messages = get_chat_messages(request.user, target_user.user)
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

   
    formatted_last_login = target_user.user.last_login.strftime(
        "%d %b %Y, %H:%M:%S")

    context = {
        "target_user_profile": target_user,
        "target_user_is_active": False,
        "target_user_last_login": formatted_last_login,
        "friends": Profile.objects.all(),
        "chat_messages": chat_messages
    }
    return render(request, "messages.html", context)


def ajax_view(request):
    if request.headers.get('X-CSRFToken') and request.method == "POST":
        # Process the request and prepare the response
        data = {
            'message': 'This is the response from the server!'
        }
        return JsonResponse(data)
    return JsonResponse({'error': 'Invalid request'}, status=400)
