from copyreg import constructor
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

# API = Application Programming Interface

# HTTP Methods
# 1. GET     ->   Gets information from API 
# 2. POST    ->   Sends information to API
# 3. PUT     ->   Updates information in API (specific object)
# 4. PATCH   ->   Partial update of object in API   
# 5. DELETE  ->   Deletes information from API (specific object)


@api_view(['GET', 'POST'])
def hello_world(request):
    if request.method == 'GET':
        return Response({"message": "Hello, world!"})
    
    elif request.method == 'POST':
        print(request.data)
        return Response({"message": "Hello, world!"}, status=status.HTTP_201_CREATED)



class HelloWorld(APIView):
    def get(self, request):
        # .../?name-startswith=John
        # .../?age-between=18-30
        users = [
            {"id":1, "name":  "John",    "age":15},
            {"id":2, "name":  "Liza",    "age":20},
            {"id":3, "name":  "Marta",   "age":12},
            {"id":4, "name":  "Maks",    "age":35},
            {"id":5, "name":  "Azim",    "age":18},
            {"id":6, "name":  "Dadosh",  "age":15},
            {"id":7, "name":  "Lyosha",  "age":12},
            {"id":8, "name":  "Akerfer", "age":55},
            {"id":9, "name":  "Sherzod", "age":20},
            {"id":10, "name": "Islom",   "age":25},
        ]
        context = {}
        # age-between="18-30"
        # age = request.query_params.get('age-between')
        # start, end = age.split("-")
        # filtered_users = list(filter(lambda user: int(start) <= user['age'] <= int(end), users))
        # print(filtered_users)

        
        if color := request.query_params.get('color'):
            context['color'] = color
            print("Color is: ", color)

        if price := request.query_params.get('price'):
            context['price'] = price
            print("Price is: ", price)
            
        if age := request.query_params.get('age'):
            context['age'] = age
            print("Age is: ", age)

        return Response({"context": context})
    
    def post(self, request):
        data = request.data
        print(data.get("title"))
        return Response({"message": "Hello, world!"}, status=status.HTTP_201_CREATED)
