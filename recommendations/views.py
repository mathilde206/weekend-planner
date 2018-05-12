from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

from .models import Recommendation
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    RecommendationCreateSerializer,
    RecommendationDetailSerializer,
    RecommendationsListSerializer, )


class RecommendationCreateAPIView(CreateAPIView):
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RecommendationDeleteAPIView(DestroyAPIView):
    lookup_field = 'slug'
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class RecommendationDetailAPIView(RetrieveAPIView):
    lookup_field = 'slug'
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class RecommendationsListAPIView(ListAPIView):
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationsListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class RecommendationUpdateAPIView(RetrieveUpdateAPIView):
    lookup_field = 'slug'
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationCreateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
