from django.views.generic import TemplateView
from django.shortcuts import render

def home(request):
    return render(request, "home.html")

class HomePageView(TemplateView):
    template_name = 'home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['message'] = 'Welcome to my website!'
        return context

