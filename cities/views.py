from rest_framework.filters import (
    SearchFilter
)

from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView
)

from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny)

from .models import City
from .serializers import CitySerializer


# Create your views here.
class CityRetrieveView(RetrieveAPIView):
    lookup_field = 'pk'
    permission_classes = [AllowAny]
    serializer_class = CitySerializer
    filter_backends = [SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return City.objects.all()


class CityListView(ListAPIView):
    lookup_field = 'name'
    permission_classes = [AllowAny]
    serializer_class = CitySerializer
    filter_backends = [SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        return City.objects.all()


class CityCreateView(CreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [IsAuthenticated]
