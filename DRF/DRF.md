# TABLE OF CONTENTS
- [Introduction](#introduction)
- [CRUD Operations & Serializers (easy way)](#crud-operations--serializers-easy-way)
- [Serialization and Deserialization](#serialization-and-deserialization)
- [API views](#api-views)
- [Authentication and Authorization](#authentication-and-authorization)
- [JWT](#jwt)


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
        # We need this to allow everyone to access the API
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        # We need this to render the response in JSON format (default)
        'rest_framework.renderers.BrowsableAPIRenderer',
        # The view of browseable API is a human-friendly interface for the API
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',  # parse simple JSON data
        'rest_framework.parsers.FormParser',  # parse FormData from JS in 
        'rest_framework.parsers.MultiPartParser', # parse file data
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
    price_in_discount = serializers.SerializerMethodField(read_only=True, method_name='price_after_discount')
    author_name = serializers.SerializerMethodField(read_only=True, method_name='current_user_as_author')

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



# API views

### Diffirent types of API-views
```python
from django.http import HttpResponse
from rest_framework import status

# For using a decorators
from rest_framework.response import Response
from rest_framework.decorators import api_view

# For using class-based views
from rest_framework.views import APIView
from rest_framework import generics, viewsets

@api_view(['GET', 'POST'])
def books_view(request):
    data = modal_to_dict(Book.objects.all())
    return Response({'message': 'Hello, world!'}, status=status.HTTP_200_OK)

class Books():
    @staticmethod
    @api_view(['GET', 'POST'])
    def books_view(request):
        return Response(
                        {'message': 'Hello, world!'}, 
                        status=status.HTTP_200_OK
                    )

# If we want to use it in the class-based view
class BookView(APIView):
	def get(self, request):
        all_books = Books.objects.all()
        books = BooksSerializer(all_books, many=True)
        return Response(books.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = BooksSerializer(data=request.data)
        if data.is_valid():
            data.save()
            return Response(data.data, status=status.HTTP_201_CREATED)
```

### ViewSets
- ViewSets are simple class-based views, but they come with benefits. There are a few ViewSets classes available in DRF that you can use to quickly scaffold a functioning API CRUD project. You can also provide permission classes and throttle classes to allow authenticated API calls and rate limiting.
- RU: ViewSets - это простые представления на основе классов, но они имеют свои преимущества. В DRF доступно несколько классов ViewSets, которые вы можете использовать для быстрого создания функционирующего проекта API CRUD. Вы также можете предоставить классы разрешений и классы ограничения пропускной способности, чтобы разрешить аутентифицированные вызовы API и ограничение скорости.

Here are some of them that are mostly used:
1. **ViewSet** - does not provide any actions by default, and does not include the base set of generic view behavior.
So, you need to provide the implementation for each action explicitly.
2. **ModelViewSet** - provides CRUD functions with a single class. It accepts a queryset and a serializer class as required parameters. It also provides the following actions out of the box: list, retrieve, create, update, partial_update, destroy.
3. **ReadOnlyModelViewSet** - provides the read-only actions list and retrieve.

```python
from rest_framework import viewsets
from .models import MyModel
from .serializers import MyModelSerializer

class MyViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = MyModel.objects.all()
        serializer = MyModelSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):  # POST
        pass

    def retrieve(self, request, pk=None):   # GET
        pass

    def update(self, request, pk=None):    # PUT
        pass

    def partial_update(self, request, pk=None):  # PATCH
        pass

    def destroy(self, request, pk=None):    # DELETE
        pass

class MyModelViewSet(viewsets.ModelViewSet):
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

class MyReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

```

### Generic views 
- Generic views are another way of quickly writing class-based views to scaffold fully functional CRUD API projects. There are several generic views that offer a particular functionality, like displaying resources or creating a new resource and so on. All you must do is extend these generic views to make your API endpoints work.
- RU: Обобщенные представления - это еще один способ быстрого написания представлений на основе классов для создания полностью функциональных проектов API CRUD. Существует несколько обобщенных представлений, которые предлагают определенную функциональность, например, отображение ресурсов или создание нового ресурса и т. Д. Все, что вам нужно сделать, это расширить эти обобщенные представления, чтобы ваши конечные точки API работали.

- CreateAPIView           - `POST` - Used for creating objects.
- ListAPIView             - `GET`  - Used for listing objects.
- RetrieveAPIView         - `GET`  - Display a single resource
- DestroyAPIView          - `DELETE` - Used for deleting objects.
- UpdateAPIView           - `PUT, PATCH` - Used for updating objects.
- ListCreateAPIView       - `GET, POST` - Used for listing and creating objects.
- RetrieveUpdateAPIView   - `GET, PUT, PATCH` - Used for retrieving and updating objects.
- RetrieveDestroyAPIView  - `GET, DELETE` - Used for retrieving and deleting objects.
- RetrieveUpdateDestroyAPIView - `GET, PUT, PATCH, DELETE` - Used for retrieving, updating, and deleting objects.

```python
from rest_framework import generics
from .models import MyModel

class MyCreateAPIView(generics.CreateAPIView):
    """ Used for creating objects. """
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class MyListAPIView(generics.ListAPIView):
    """ Used for listing objects. """
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

    def get_queryset(self):
        return self.queryset.filter(author=self.request.user)

class MyRetrieveAPIView(generics.RetrieveAPIView):
    """ Used for retrieving a single object. """
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

class MyDestroyAPIView(generics.DestroyAPIView):
    """ Used for deleting objects. """
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

class MyUpdateAPIView(generics.UpdateAPIView):
    """ Used for updating objects. """
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

class MyListCreateAPIView(generics.ListCreateAPIView):
    """ Used for listing and creating objects. """
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

class MyRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    """ Used for retrieving and updating objects. """
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

class MyRetrieveDestroyAPIView(generics.RetrieveDestroyAPIView):
    """ Used for retrieving and deleting objects. """
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

class MyRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """ Used for retrieving, updating, and deleting objects. """
    queryset = MyModel.objects.all()
    serializer_class = MyModelSerializer

# =========================================================================
# in urls.py
...
path('api/.../', ...APIView.as_view(), name='...'),
...
```



### Permissions classes
- `AllowAny` - Allow any access
- `IsAuthenticated` - Allow access only to authenticated users
- `IsAdminUser` - Allow access only to admin users
- `IsAuthenticatedOrReadOnly` - Allow access to authenticated users (read-only) and allow access to non-authenticated users (read-only)


# Authentication and Authorization

### General information
- Authentication is the process of verifying the credentials of a user. Logging into websites with a username and password is a typical example of authentication. When the username and password match, the website recognizes the user and sets some cookies in the user’s browser. When the user visits another page on that website, the browser sends those cookies within the HTTP request header. The website recognizes the cookies as well as server-side session data and therefore doesn’t ask for credentials until the user logs out again.  

- So, how does this work? Token-based authentication usually involves two steps in the API Architecture. First, the client identifies itself with a username and password. Then the API server gives it a bearer token. From there, the client includes the bearer token with every API call that it places. The API server verifies it and then allows the client to perform the action or not. This is where authorization comes in

- If the credentials are not valid, the client will receive a **`401 - Unauthorized`** HTTP status code.

- This is like coming to the office on the first day, submitting all your papers and documents, and then receiving your employee card. After that, only your employee card will be sufficient to get inside. Authentication works just like that!

- The two steps in the API authentication process can be represented by the following two diagrams.

```markdown
1. Authentication      2. Authorization
+----------------+     +----------------+
|    Client      |     |     Client     |
|  +----------+  |     |  +----------+  |
|  |          |  |     |  |  Token   |  |
|  |  Login   |  |     |  |          |  |
|  |          |  |     |  |  Group   |  |
|  +----------+  |     |  +----------+  |
|  +----------+  |     |  +----------+  |
|  |          |  |     |  |          |  |
|  |  Token   |  |     |  |  Action  |  |
|  |          |  |     |  |          |  |
|  +----------+  |     |  +----------+  |
+----------------+     +----------------+
```

### Token based authentication

```python
# settings.py
INSTALLED_APPS = [
    ...
    'rest_framework.authtoken', # Allows us create a token for each user
    ...
]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # Allows us to use token authentication throughout the project
        'rest_framework.authentication.TokenAuthentication',
    ],
}
if DEBUG:
    REST_FRAMEWORK['DEFAULT_AUTHENTICATION_CLASSES'] += [
        'rest_framework.authentication.SessionAuthentication',
    ]
```

- For allowing token authentication, we need to create a token for each user. 
There, we would need obtain_auth_token


```python
# urls.py
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
    ...
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    ...
]
```
- Then, we need to create a view for it.

```python
# views.py
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=200)
    else:
        return Response({'error': 'Wrong credentials'}, status=400)
```

### Authorization
Authorization is the process of determining whether a user has access to a resource.
For example, if the user can delete or update something or not.
We can do this by adding certain user to a group and then check if the user is in that group or not. So, by doing this we authorize the user to do certain actions.


```python
# views.py
@api_view()
def is_admin(request):
    if request.user.groups.filter(name='admin').exists():
        return Response({'message': 'You are admin'}, status=200)
    else:
        return Response({'message': 'You are not admin'}, status=400)
```

### Throttling
- Throttling means that we can postpone the request for a certain amount of time.
For example, we can allow only 5 requests per minute.
We need this to prevent the server from overloading.
Sometimes, a user can try to break in by trying to guess the password. So, we can prevent this by adding throttling. This way, that user will be able to make only 5 requests per minute.

```python
# settings.py

REST_FRAMEWORK = {
    ...
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle', # for anonymous users
        'rest_framework.throttling.UserRateThrottle', # for authenticated users
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '3/minute', # 3 requests per minute
        'user': '5/minute', # 5 requests per minute
    }
}
```
Then we need to add it to the view.
```python
# views.py
from rest_framework.throttling import UserRateThrottle

class MyView(APIView):
    throttle_classes = [UserRateThrottle]
    ...
```

If we want to create manual throttling for a specific view, we can do it like this:
```python
# views.py
from rest_framework.throttling import UserRateThrottle

class TenCallsPerMinute(UserRateThrottle):
    scope = 'ten'

class MyView(APIView):
    throttle_classes = [TenCallsPerMinute]
    ...

# settings.py
...
DEFAULT_THROTTLE_RATES = {
    ...
    'ten': '10/minute',
    ...
}
```


### Djoser
- Djoser is a REST implementation of Django authentication system. It provides a set of endpoints for authentication, registration, password reset, etc.

`pipenv || pip   install djoser`

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'djoser', # It is vital to add it after rest_framework
    # RU: Важно добавить его после rest_framework
    ...
]

DJOSER = {
    "USER_ID_FIELD": "username", # We use username for login
    # "LOGIN_FIELD": "email", # We can use email or username for login
    # "USER_CREATE_PASSWORD_RETYPE": True, # We can use this to make user retype the password
}

# urls.py
urlpatterns = [
    ...
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    ...
    # handy endpoints list
    # --------------------------------
    # /auth/users/ - list of all users
    # /auth/users/me/ - current user
    # /auth/users/confirm/ - confirm email
    # /auth/users/resend_activation/ - resend activation email
    # /auth/users/set_password/ - set new password
    # /auth/users/reset_password/ - reset password
    # /auth/users/reset_password_confirm/ - confirm reset password
    # /auth/token/login/ - login
    # /auth/token/logout/ - logout
]

```



# JWT
### JWT Authentication
- JSON Web Token (JWT) is  a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. (Digitally signed means that it is signed using a secret key that only the server knows.)

`pipenv || pip   install djangorestframework_simplejwt`

[JWT-documentation](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html?highlight=settings)

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'rest_framework_simplejwt',
    ...
]

REST_FRAMEWORK = {
    ...
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # TokenAuthentication is replaced with JWTAuthentication
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    ...
}

# urls.py
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    ...
    path('api/token/create/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    ...
]

# settings.py
# JWT settings
from datetime import timedelta
REFRESH_TOKEN_LIFETIME_SIX_WEEKS = 42 # days

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=2),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=REFRESH_TOKEN_LIFETIME_SIX_WEEKS),
    'ROTATE_REFRESH_TOKENS': True, # If True, refresh tokens will be rotated
    # That means that after each request we will get a new refresh token
    # RU: Если True, токены обновления будут поворачиваться
    # Это означает, что после каждого запроса мы получим новый токен обновления
    'AUTH_HEADER_TYPES': ('Bearer',),
    # In the client we need to send the token in the header like this:
    # Authorization: bearer <token>
}
```
`NOTE`
- access token expires and is not valid after settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']
But, this does NOT mean that client has to login again. Client can use refresh token to get a new access token. 
---


### Customizing JWT
If we want to some extra validation in the token, we can do it like this:
```python
# views.py
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class MyTokenRefreshView(TokenRefreshView):
    serializer_class = MyTokenRefreshSerializer

# serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        return token

class MyTokenRefreshSerializer(TokenRefreshSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        return token

# urls.py
urlpatterns = [
    ...
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    ...
]
```

# 
#
#
# 