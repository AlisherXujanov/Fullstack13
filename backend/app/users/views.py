from django.shortcuts import render
from allauth.account.views import LoginView, SignupView
from .forms import *
from nfts.models import NFTs

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