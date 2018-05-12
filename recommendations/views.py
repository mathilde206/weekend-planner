from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView)

from recommendations.models import Recommendation
from recommendations.serializers import (
    RecommendationCreateSerializer,
    RecommendationDetailSerializer,
    RecommendationsListSerializer, )

class RecommendationCreateAPIView(CreateAPIView):
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationCreateSerializer


class RecommendationDeleteAPIView(DestroyAPIView):
    lookup_field = 'slug'
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationDetailSerializer


class RecommendationDetailAPIView(RetrieveAPIView):
    lookup_field = 'slug'
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationDetailSerializer


class RecommendationsListAPIView(ListAPIView):
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationsListSerializer


class RecommendationUpdateAPIView(UpdateAPIView):
    lookup_field = 'slug'
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationCreateSerializer
