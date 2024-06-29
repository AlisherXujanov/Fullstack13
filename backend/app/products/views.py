from django.shortcuts import render
from .models import Cars

# Create your views here

def cars_view(request):
    context = {
        "title": "Cars list",
        "cars": Cars.objects.all() # [ {...},  {...},  ...]
    }
    return render(request, 'cars_list.html', context)

