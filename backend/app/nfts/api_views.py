from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .usecases import add_to_favorites_fn, remove_from_favorites_fn
from .serializers import NFTsSerializer, CommentsSerializer
from .models import NFTComments, NFTs
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView

# API = Application Programming Interface

# HTTP Methods
# 1. GET     ->   Gets information from API 
# 2. POST    ->   Sends information to API
# 3. PUT     ->   Updates information in API (specific object)
# 4. PATCH   ->   Partial update of object in API   
# 5. DELETE  ->   Deletes information from API (specific object)

class NFTListCreateView(generics.ListCreateAPIView):
    # ListCreateAPIView: GET, POST
    queryset = NFTs.objects.all()
    serializer_class = NFTsSerializer
    
    

class SingleNFTsView(generics.RetrieveUpdateDestroyAPIView):
    # RetrieveUpdateDestroyAPIView: GET, PUT, DELETE
    queryset = NFTs.objects.all()
    serializer_class = NFTsSerializer
    
    
class NFTCommentsCreateView(generics.ListCreateAPIView):
    # ListCreateAPIView: GET, POST
    queryset = NFTComments.objects.all()
    serializer_class = CommentsSerializer
    
    
    
class SingleCommentView(generics.RetrieveUpdateDestroyAPIView):
    # RetrieveUpdateDestroyAPIView: GET, PUT, DELETE
    queryset = NFTComments.objects.all()
    serializer_class = CommentsSerializer
    
    
    
class ToggleLikeApiView(APIView):
    
    def post(self, request, pk):
        nft_object = get_object_or_404(NFTs, pk=pk)
        current_user = request.user

        if current_user in nft_object.liked_by.all():
            remove_from_favorites_fn(request, pk)
        else:
            add_to_favorites_fn(request, pk)

        return Response(status=status.HTTP_200_OK)