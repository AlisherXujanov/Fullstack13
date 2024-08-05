from django.shortcuts import render, redirect
from allauth.account.forms import LoginForm, SignupForm
from django.contrib.auth import logout
from django.contrib import messages


def custom_logout(request):
    logout(request)
    return redirect('landing_page')


def custom_404(request, exception):
    return render(request, '404.html', status=404)


def landing_page(request):
    signin_form = LoginForm(request.POST or None)
    signup_form = SignupForm(request.POST or None)

    if request.method == 'POST':
        if signin_form.is_valid():
            return redirect('landing_page')
        else:
            messages.error(request, 'Error')
            return redirect('landing_page')

    return render(request, 'landing_page.html', {
        'signin_form': signin_form,
        'signup_form': signup_form
    })


def create_nft(request):
    return render(request, 'create_nft.html')
