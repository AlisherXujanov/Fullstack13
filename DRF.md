# Introduction 
- Django REST framework is a powerful and flexible toolkit for building Web APIs.


## Installation
```bash
pip install djangorestframework
```
```python
INSTALLED_APPS = [
    ...
    'rest_framework',
]
```

## Quick Start
```python
# views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET', 'POST'])
def hello_world(request):
    if request.method == 'GET':
        return Response({"message": "Hello, world!"})
    elif request.method == 'POST':
        return Response({"message": "Hello, world!"}, status=status.HTTP_201_CREATED)


# ------------------------------------------
# urls.py 
from django.urls import path
from .views import *

urlpatterns = [
    path('hello/', hello_world),
]
# ------------------------------------------

# OPTIONAL: settings.py
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ]
}
```


## Function based views VS Class based views
- Function based views
    - Easy to implement
    - Offer better readability
    - Easier to use decorators
    - Write once-off solutions quickly

- Class based views
    - write less code
    - Less code duplications 
    - Extend and add features easily
    - Methods for HTTP request types


```python
# Class based views
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class HelloWorld(APIView):
    def get(self, request):
        if author := request.query_params.get('author'):
            return Response({"message": f"Hello, {author}!"})
        return Response({"message": "Hello, world!"})

    def post(self, request):
        data = request.data #  ===  {...: ...}
        return Response({"message": "Hello, world!"}, status=status.HTTP_201_CREATED)


# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('hello/', HelloWorld.as_view()),
] 
```
