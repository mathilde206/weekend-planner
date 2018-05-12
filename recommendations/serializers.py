from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField)

from .models import Recommendation

recommendation_url = HyperlinkedIdentityField(
    view_name='recommendations-api:detail_recommendation',
    lookup_field='slug'
)

recommendation_update_url = HyperlinkedIdentityField(
    view_name='recommendations-api:update_recommendation',
    lookup_field='slug'
)

recommendation_delete_url = HyperlinkedIdentityField(
    view_name='recommendations-api:delete_recommendation',
    lookup_field='slug'
)


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
    url = recommendation_url
    update_url = recommendation_update_url
    delete_url = recommendation_delete_url
    user = SerializerMethodField()
    image = SerializerMethodField()

    def get_user(self, obj):
        return str(obj.user.username)

    def get_image(self, obj):
        try:
            image = obj.image.url;
        except:
            image = None
        return image

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
            'user',
            'views',
            'created_date',
            'url',
            'update_url',
            'delete_url',
        ]


class RecommendationsListSerializer(ModelSerializer):
    url = recommendation_url
    user = SerializerMethodField()

    def get_user(self, obj):
        return str(obj.user.username)

    class Meta:
        model = Recommendation
        fields = [
            'url',
            'user',
            'title',
        ]
