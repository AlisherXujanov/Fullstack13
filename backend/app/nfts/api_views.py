from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import NFTsSerializer
from .models import NFTs
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

# API = Application Programming Interface

# HTTP Methods
# 1. GET     ->   Gets information from API 
# 2. POST    ->   Sends information to API
# 3. PUT     ->   Updates information in API (specific object)
# 4. PATCH   ->   Partial update of object in API   
# 5. DELETE  ->   Deletes information from API (specific object)

class NFTListCreateView(generics.ListCreateAPIView):
    # ListCreateAPIView: GET, POST
    permission_classes = [IsAuthenticated]
    queryset = NFTs.objects.all()
    serializer_class = NFTsSerializer
    
    

class SingleNFTsView(generics.RetrieveUpdateDestroyAPIView):
    # RetrieveUpdateDestroyAPIView: GET, PUT, DELETE
    queryset = NFTs.objects.all()
    serializer_class = NFTsSerializer

