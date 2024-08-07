from django.shortcuts import render


def about_us(request):
    return render(request, 'about_us.html')
def contact_us(request):
    return render(request, 'contact_us.html')