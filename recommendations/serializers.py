from rest_framework.serializers import ModelSerializer

from .models import Recommendation

class RecommendationCreateSerializer(ModelSerializer):
    class Meta:
        model = Recommendation
        fields = [
            'title',
            'image',
            'number_of_days',
            'content_day1',
            'content_day2',
            'content_day3',
        ]


class RecommendationDetailSerializer(ModelSerializer):
    class Meta:
        model = Recommendation
        fields = [
            'id',
            'title',
            'slug',
            'image',
            'number_of_days',
            'content_day1',
            'content_day2',
            'content_day3',
            'author',
            'views',
            'created_date',
        ]


class RecommendationsListSerializer(ModelSerializer):
    class Meta:
        model = Recommendation
        fields = [
            'id',
            'title',
            'slug',
            'content_day1',
        ]
