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





# CRUD Operations & Serializers (easy way)


## CRUD Operations
We need here:
- Model
- Serializer
- View
- URL

```python
# models.py
...

# ========================================
# serializers.py

from rest_framework import serializers
from .models import *

class NFTSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFTs
        fields = '__all__'

# ========================================
# views.py
from rest_framework import generics
from .models import *
from .serializers import *

class NFTListCreate(generics.ListCreateAPIView):
    # ListCreateAPIView: GET, POST
    queryset = NFT.objects.all()
    serializer_class = NFTSerializer

class SingleNFTsView(generics.RetrieveUpdateDestroyAPIView):
    # RetrieveUpdateDestroyAPIView: GET, PUT, DELETE
    queryset = NFTs.objects.all()
    serializer_class = NFTSerializer


# ========================================
# urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('NFTs/', NFTListCreate.as_view()),
    path('NFTs/<int:pk>/', SingleNFTsView.as_view()),
]
```


## Serializers (easy way)

- can easily convert complex data types into native Python datatypes that can then be easily rendered into JSON, XML or other content types.
- Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data.

```python
# views.py
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from django.shortcuts import get_object_or_404

@api_view()
def get_nfts(request):
    nfts = NFT.objects.all()
    return Response(nfts.values())

# ----------------------------------------------
# with the help of serializers.py
from .serializers import NFTSerializer

# we can control what we want to show
@api_view()
def get_nfts(request):
    nfts = NFT.objects.all()
    serializer = NFTSerializer(nfts, many=True)
    return Response(serializer.data)


@api_view()
def get_nft(request, pk):
    nft = NFT.objects.get(pk=pk)
    # nft = get_object_or_404(NFT, pk=pk)
    serializer = NFTSerializer(nft)
    return Response(serializer.data)
```


# Serializers (advanced way)