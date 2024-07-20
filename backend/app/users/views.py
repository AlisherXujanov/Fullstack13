from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Profile
from products.models import Cars, CarImage


def users(request):
    context = {
        "title": "Hello world from Views",
        "content": "This is the content of the page"
    }
    return render(request, "users.html", context)


@login_required
def profile_page(request, pk=None):
    obj = Profile.objects.get(user__pk=pk)
    context = {
        "obj": obj,
        "cars": Cars.objects.filter(author_of_ad=obj.user)
    }
    return render(request, "profile_page.html", context)
