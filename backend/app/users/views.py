from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Profile


def users(request):
    context = {
        "title": "Hello world from Views",
        "content": "This is the content of the page"
    }
    return render(request, "users.html", context)


@login_required
def profile_page(request, pk=None):
    obj = Profile.objects.get(pk=pk)
    return render(request, "profile_page.html", {"obj": obj})