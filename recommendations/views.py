from django.db.models import Q

from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)

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
from .pagination import RecommendationPageNumberPagination
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    RecommendationCreateUpdateSerializer,
    RecommendationDetailSerializer,
    RecommendationsListSerializer, )


class RecommendationCreateAPIView(CreateAPIView):
    """
    This view allows an authenticated user to create a new recommendation
    """
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationCreateUpdateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        With this function, we attach the user's name to the new recommendation
        """
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
    """
    This api view gets all the non draft recommendations and can be filtered with query parameters (?search=)
    """
    # TODO: allow to search only specific fields (ex: just city) or is it useless ?
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationsListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['title', 'content_day1', 'content_day2', 'content_day3', 'user__first_name', 'user__last_name',
                     'user__username']
    pagination_class = RecommendationPageNumberPagination


class RecommendationUpdateAPIView(RetrieveUpdateAPIView):
    lookup_field = 'slug'
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationCreateUpdateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

# TODO: Add a Recommendation list for posts from a user and posts about a city (use filter on queryset instead of all)
# TODO: Create a API to receive drafts from a user