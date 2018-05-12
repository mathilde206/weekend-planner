from django.conf.urls import url
from .views import (
    RecommendationCreateAPIView,
    RecommendationDeleteAPIView,
    RecommendationsListAPIView,
    RecommendationDetailAPIView,
    RecommendationUpdateAPIView
)

urlpatterns = [
    url(r'^$', RecommendationsListAPIView.as_view(), name='recommendations_list'),
    url(r'(?P<slug>[\w-]+)$', RecommendationDetailAPIView.as_view(), name='detail_recommendation'),
    url(r'^create/$', RecommendationCreateAPIView.as_view(), name='create_recommendation'),
    url(r'(?P<slug>[\w-]+)/delete/$' , RecommendationDeleteAPIView.as_view(), name='delete_recommendation'),
    url(r'(?P<slug>[\w-]+)/edit/$' , RecommendationUpdateAPIView.as_view(), name='update_recommendation'),
]