from django.shortcuts import render
from rest_framework.generics import (
    RetrieveAPIView,
    CreateAPIView
)

from rest_framework.permissions import IsAuthenticated

from .models import City
from .serializers import CitySerializer

# Create your views here.
class CityRetrieveView(RetrieveAPIView):
    lookup_field = 'name'
    serializer_class = CitySerializer

    def get_queryset(self):
        return City.objects.all()

class CityCreateView(CreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [IsAuthenticated]
