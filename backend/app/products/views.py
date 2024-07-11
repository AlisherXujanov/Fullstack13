from django.shortcuts import render, redirect
from .models import Cars, CarImage
from .forms import CarsForm
from django.contrib.auth.models import User
from django.contrib import messages

# Create your views here
admin = User.objects.get(id=1)


def cars_view(request):
    cars = Cars.objects.all()
    images = CarImage.objects.all()
    context = {"cars": []}

    for car in cars:
        car_images = images.filter(car=car)
        context["cars"].append({
            "car": car,
            "images": car_images
        })

    return render(request, 'cars_list.html', context)


def create_car_view(request):
    form = CarsForm()

    if request.method == 'POST':
        form = CarsForm(request.POST, request.FILES)
        images = request.FILES.getlist('images')

        if form.is_valid():
            form.instance.author_of_ad = admin
            form.save()

            for img in images:
                CarImage.objects.create(car=form.instance, image=img)

            messages.success(request, "Car created successfully")
            return redirect('cars_view')

    context = {'form': form, "multiple_image": True}
    return render(request, 'create_car.html', context)


def update_car_view(request, pk: int):
    car = Cars.objects.get(id=pk)
    form = CarsForm(instance=car)

    if request.method == 'POST':
        form = CarsForm(request.POST, request.FILES, instance=car)
        if form.is_valid():
            car.brand = form.cleaned_data.get("brand")
            car.model = form.cleaned_data.get("model")
            car.year = form.cleaned_data.get("year")
            car.color = form.cleaned_data.get("color")
            car.price = form.cleaned_data.get("price")
            car.address = form.cleaned_data.get("address")
            car.save()
            messages.success(request, "Car updated successfully")
            return redirect('cars_view')

    context = {
        'form': form,
        "car": car,
    }
    return render(request, 'update_car.html', context)


def car_details_view(request, pk: int):
    context = {
        "car": Cars.objects.get(id=pk),
        "images": CarImage.objects.filter(car=pk)
    }
    return render(request, 'car_details.html', context)


def delete_car(request, pk: int):
    car = Cars.objects.get(id=pk)
    car.delete()
    messages.success(request, "Car deleted successfully")
    return redirect('cars_view')
