from django.shortcuts import render


def about_us(request):
    return render(request, 'about_us.html')

def custom_404(request, exception):
    return render(request, '404.html', status=404)

def become(request):
    return render(request, 'become.html')

def contact_us(request):
    return render(request, 'contact_us.html')