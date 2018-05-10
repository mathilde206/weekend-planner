from django.shortcuts import render
from rest_framework import generics
from .models import City
from .serializers import CitySerializer

# Create your views here.
class CityView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'
    serializer_class = CitySerializer

    def get_queryset(self):
        return City.objects.all()