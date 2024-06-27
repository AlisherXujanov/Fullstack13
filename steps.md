## 1. Create an app
```bash
python manage.py startapp ...

# NOTE: INCLUDE this in settings.py
# RU: ДОБАВЬТЕ ЭТО В settings.py
INSTALLED_APPS = [
    ...
    'name-of-app',
    ...
]
```


## 2. Update admin.py
get the code from [Django.md](Django.md)

## 3. Create urls.py
```python
from django.urls import path
from .views import *

urlpatterns = [
    path("", function-name, name='some-name'),
]


# NOTE:  INCLUDE this in urls.py of the main project 
# RU: ДОБАВЬТЕ ЭТО В urls.py ОСНОВНОГО ПРОЕКТА

# main  urls.py
# path('name-of-app/', include('name-of-app.urls'))
```


## 4. Create views.py
```python
def view-name(request):
    context = {'key': 'value',}
    return render(request, 'name-of-html-file.html', context)
```


