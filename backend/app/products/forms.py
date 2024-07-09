from django import forms
from .models import Cars


CHOICES = (
    ('Грузовик',  'Грузовик'),
    ('Легковой',  'Легковой'),
    ('Мотоцикл',  'Мотоцикл'),
    ('Автобус',  'Автобус'),
    ('Спецтехника',  'Спецтехника'),
    ('Водный',  'Водный'),
    ('Воздушный',  'Воздушный'),
    ('Сельхозтехника',  'Сельхозтехника'),
    ('Коммерческий',  'Коммерческий'),
    ('Прицепы', 'Прицепы'),
    ('Запчасти', 'Запчасти'),
    ('Другое', 'Другое')
)


class CarsForm(forms.ModelForm):
    image = forms.ImageField(label='Image', required=False,
                             widget=forms.FileInput(attrs={'class': 'form-control'}))
    category = forms.ChoiceField(
        choices=CHOICES, widget=forms.Select(attrs={'class': 'form-select'}))

    class Meta:
        model = Cars
        fields = ["brand", "model", "year",
                  "color", "price", "address", "image", "category"]
