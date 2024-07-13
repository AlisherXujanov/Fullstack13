from django import forms
from .models import Cars
import re


CHOICES = (
    ('Другое', 'Другое'),
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
)


class CarsForm(forms.ModelForm):
    category = forms.ChoiceField(
        choices=CHOICES, widget=forms.Select(attrs={'class': 'form-select'}))

    def __init__(self, *args, **kwargs):
        super(CarsForm, self).__init__(*args, **kwargs)
        self.brand = self.data.get('brand')
        self.model = self.data.get('model')

    def is_valid(self):
        form = super(CarsForm, self).is_valid()

        # if self.brand == 'bemiyya':
        #     self.add_error('brand', 'Нельзя использовать слово "бемийя"')
        #     return False
        self.form_valid = True

        brand_pattern = r'^[a-zA-Z]$'
        if not re.match(brand_pattern, self.brand):
            self.add_error('brand', 'Слово должно состоять только из букв')
            self.form_valid = False

        model_pattern = r'^[a-zA-Z0-9]$'
        if not re.match(model_pattern, self.model):
            self.add_error('model', 'Слово должно состоять только из букв и цифр')
            self.form_valid = False

        return form if self.form_valid else False

    class Meta:
        model = Cars
        fields = ["brand", "model", "year",
                  "color", "price", "address", "category"]
