from .models import Profile
from .serializers import ProfileSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
import json

# JWT: JSON Web Token

class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def post(self, request):
        ids = request.body
        profile_ids = json.loads(ids)['profiles']
        profiles = Profile.objects.filter(id__in=profile_ids)
        serializer = ProfileSerializer(profiles, many=True)
        return Response({"profiles": serializer.data}, status=200)



class UpdateProfileView(APIView):
    def put(self, request):
        # ----------- Update Profile  -------------        
        bio = json.loads(request.body)["bio"].strip()
        profile = Profile.objects.get(user=request.user)
        profile.bio = bio
        profile.save()
        # ----------- Update USER -------------
        user_info = json.loads(request.body)["user"]
        user = request.user
        user.username = user_info["username"]
        user.first_name = user_info["first_name"]
        user.last_name = user_info["last_name"]
        user.email = user_info["email"]
        user.save()
        return Response({"success": True})


class UpdateProfilePictureView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    