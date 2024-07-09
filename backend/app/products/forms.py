from django import forms
from .models import Cars


CHOICES = (
    ('1', 'Грузовик'),
    ('2', 'Легковой автомобиль'),
    ('3', 'Мотоцикл'),
    ('4', 'Автобус'),
    ('5', 'Спецтехника'),
    ('6', 'Водный транспорт'),
    ('7', 'Воздушный транспорт'),
    ('8', 'Сельхозтехника'),
    ('9', 'Коммерческий транспорт'),
    ('10', 'Прицепы'),
    ('11', 'Запчасти'),
    ('12', 'Другое')
)


class CarsForm(forms.ModelForm):
    image = forms.ImageField(label='Image', widget=forms.FileInput(
        attrs={'class': 'form-control'}))
    category = forms.ChoiceField(
        choices=CHOICES, widget=forms.Select(attrs={'class': 'form-select'}))

    class Meta:
        model = Cars
        fields = ["brand", "model", "year",
                  "color", "price", "address", "image", "category"]
