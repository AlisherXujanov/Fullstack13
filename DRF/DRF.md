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



# Serialization and Deserialization

## Serializer
- In easy words, serializers are used to convert complex data, such as querysets and model instances, to native Python datatypes that can then be easily rendered into JSON, XML, or other content types. Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data.

```python
from rest_framework import serializers

class BookSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True) # NOTE: usually we don't want to add id field
    title = serializers.CharField(max_length=255)
    author = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data:dict) -> Books:
        return Books.objects.create(**validated_data)

    def update(self, instance:Books, validated_data:dict) -> Books:
        instance.title = validated_data.get('title', instance.title)
        instance.author = validated_data.get('author', instance.author)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance
```

## ModelSerializer
- ModelSerializer is a shortcut to create a serializer class with fields that correspond to the Model fields. It will create a set of default fields for you, based on the model.
- RU: ModelSerializer - это сокращение для создания класса сериализатора с полями, соответствующими полям модели. Он создаст для вас набор полей по умолчанию на основе модели.

```python
from rest_framework import serializers
DISCOUNT_IN_PERCENT = 10

class BookSerializer(serializers.ModelSerializer):
    price_in_discount = serializers.IntegerField(read_only=True, method_name='price_after_discount')
    author_name = serializers.CharField(read_only=True, method_name='current_user_as_author')

    # NOTE: 
    # 1. We can aslo use rename existing fields by using source attribute
    # ex: author_name = serializers.CharField(source='author.username')
    # 2. We can also use SerializerMethodField() to create a custom field
    # ex: price_in_discount = serializers.SerializerMethodField(method_name='price_after_discount')

    class Meta:
        model = Book
        fields = ['title', 'author_name', 'price_in_discount', 'description', 'created_at']

    def price_after_discount(self, obj:Book):
        discount_price = obj.price - (obj.price * DISCOUNT_IN_PERCENT / 100)
        return f'${discount_price} - ({DISCOUNT_IN_PERCENT}% discount)'

    def current_user_as_author(self, obj:Book):
        request = self.context.get('request')
        return request.user.username

# NOTE: To be able to get request object in serializer, 
#       you need to pass it in the view MySerializer(..., context={'request': request})

# =====================================================
# in views.py 
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import BookSerializer

@api_view()
def get_books(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True, context={'request': request})
    return Response(serializer.data)

# OUTPUT:
# {
#     "title": "Book1",
#     "author_name": "admin",
#     "price_in_discount": "$90 - (10% discount)",
#     "description": "This is a book",
#     "created_at": "2022-01-01T00:00:00Z"
# }
```


## Relationship serializer
- Let's say we have another model for 'genre' field of Books model.
- RU: Допустим, у нас есть другая модель для поля «жанр» модели Books.
```python
# models.py
class Genre(models.Model):
    slug = models.SlugField(unique=True) # this is for url
    name = models.CharField(max_length=50, unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Books(models.Model):
    ...
    genre = models.ForeignKey(Genre, on_delete=models.PROTECT, default=1)
    ...
```

- So, we need to create a serializer for it and then use it in BooksSerializer
- RU: Итак, нам нужно создать для него сериализатор, а затем использовать его в BooksSerializer

```python
# serializers.py
class BooksSerializer(serializers.ModelSerializer):
    ...
    genre = serializers.HyperlinkedRelatedField(
        queryset=Genre.objects.all(),
        view_name='genre-detail',
        lookup_field='slug'
    )
    class Meta:
        model = Books
        fields = [..., 'genre', ...]
    ...
```

Then, we need to create a view for it.
```python
# NOTE: There is a convention you must follow when you create this view name. The rule is that you have to add -detail after the related field name, which is category in the MenuItemSerializer. This is why the view name was category-detail in this code. If the related field name was user, the view name would be user-detail. 

from .models import Genre 
from .serializers import GenreSerializer
from django.shortcuts import get_object_or_404 # for 404 error if the object does not exist
@api_view()
def genre_detail(request, slug):
    genre = get_object_or_404(Genre, slug=slug)
    serializer = GenreSerializer(genre)
    return Response(serializer.data)

# In urls.py
urlpatterns = [
    ...
    path('genres/<slug:slug>/', genre_detail, name='genre-detail'),
]
```

## HyperlinkedModelSerializer
- HyperlinkedModelSerializer is similar to ModelSerializer, but it uses hyperlinks to represent relationships instead of primary keys.

```python
from rest_framework import serializers
from .models import *

class GenreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Genre
        fields = ['url', 'slug', 'name']

# =====================================================
# in views.py
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import GenreSerializer

@api_view()
def get_genres(request):
    genres = Genre.objects.all()
    serializer = GenreSerializer(genres, many=True, context={'request': request})
    return Response(serializer.data)
```