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
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['title', 'content_day1', 'content_day2', 'content_day3', 'user__first_name', 'user__last_name',
                     'user__username']
    pagination_class = RecommendationPageNumberPagination
    # note: to use ?search=&ordering=

    # limitoffset : limit: how many & offset= skip --> in the query

    # def get_queryset(self):
    #     queryset_list = Recommendation.objects.all()
    #     query = self.request.GET.get('q')
    #     if query:
    #         queryset_list = queryset_list.filter(
    #             Q(title__contains=query)|
    #             Q(content_day1__contains=query)|
    #             Q(content_day2__contains=query)|
    #             Q(content_day3__contains=query)|
    #             Q(user__first_name__contains=query)|
    #             Q(user__last_name__contains=query)|
    #             Q(user__username__contains=query)
    #         ).distinct()
    #     return queryset_list


class RecommendationUpdateAPIView(RetrieveUpdateAPIView):
    lookup_field = 'slug'
    queryset = Recommendation.objects.active()
    serializer_class = RecommendationCreateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

# TODO: Add a Recommendation list for posts from a user and posts about a city (use filter on queryset instead of all)
