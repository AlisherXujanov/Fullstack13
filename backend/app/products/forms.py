from django.forms import forms, ModelForm
from .models import Cars


class CarsForm(ModelForm):
    class Meta:
        model = Cars
        fields = ["brand", "model", "year", "color", "price", "address"]
