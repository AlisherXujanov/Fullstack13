from django.shortcuts import render, redirect
from .models import Cars
from .forms import CarsForm
from django.contrib.auth.models import User

# Create your views here
admin = User.objects.get(id=1)


def cars_view(request):
    context = {
        "title": "Cars list",
        "cars": Cars.objects.all()  # [ {...},  {...},  ...]
    }
    return render(request, 'cars_list.html', context)


def create_car_view(request):
    form = CarsForm()
    
    if request.method == 'POST':
        form = CarsForm(request.POST)
        if form.is_valid():
            form.instance.author_of_ad = admin
            form.save()
            return redirect('cars_view')
    
    context = {'form': form}
    return render(request, 'create_car.html', context)


