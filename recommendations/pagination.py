from rest_framework.pagination import (
    LimitOffsetPagination,
    PageNumberPagination,
)


class RecommendationPageNumberPagination(PageNumberPagination):
    page_size = 5