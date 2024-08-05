from django.shortcuts import render,redirect
from allauth.account.forms import LoginForm, SignupForm
from django.contrib.auth import logout
from django.shortcuts import render

def custom_logout(request):
    logout(request)
    return redirect('landing_page')

def custom_404(request, exception):
    return render(request, '404.html', status=404)

def landing_page(request):
    signin_form = LoginForm()
    signup_form = SignupForm()
    return render(request, 'landing_page.html',{
        'signin_form':signin_form,
        'signup_form':signup_form
    })