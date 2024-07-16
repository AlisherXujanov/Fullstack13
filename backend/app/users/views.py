from django.shortcuts import render

# Create your views here.


def users(request):
    context = {
        "title": "Hello world from Views",
        "content": "This is the content of the page"
    }
    return render(request, "users.html", context)


def profile_page(request, pk):
    ...
    