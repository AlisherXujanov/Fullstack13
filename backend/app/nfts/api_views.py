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
        context = {}
        
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
