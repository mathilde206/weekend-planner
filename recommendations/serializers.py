from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField)

from comments.serializers import (
    CommentDetailSerializer,
    CommentSerializer,
)

from comments.models import Comment



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


class RecommendationCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Recommendation
        fields = [
            'title',
            'budget',
            'city',
            'content_day1',
            'content_day2',
            'content_day3',
            'draft',
            'image',
            'number_of_days',
        ]


class RecommendationDetailSerializer(ModelSerializer):
    city = SerializerMethodField()
    comments = SerializerMethodField()
    delete_url = recommendation_delete_url
    image = SerializerMethodField()
    url = recommendation_url
    update_url = recommendation_update_url
    user = SerializerMethodField()

    def get_user(self, obj):
        """
        We get the user's username instead of its foreign key/id
        """
        return str(obj.user.username)

    def get_image(self, obj):
        """
        If an image was uploaded, we add its url
        """
        # TODO: the media upload doesn't work !!!!
        try:
            image = obj.image.url;
        except:
            image = None
        return image

    def get_comments(self, obj):
        comments_qs = Comment.objects.filter_by_instance(obj)
        comments = CommentSerializer(comments_qs, many=True).data
        return comments

    def get_city(self, obj):
        return {
            'name': obj.city.name,
            'country': obj.city.country,
            'currency': obj.city.currency,
            'language': obj.city.language
        }

    class Meta:
        model = Recommendation
        fields = [
            'title',
            'budget',
            'city',
            'comments',
            'content_day1',
            'content_day2',
            'content_day3',
            'image',
            'likes',
            'number_of_days',
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
            'title',
            'city',
            'likes',
            'number_of_days',
            'slug',
            'url',
            'user',
            'views'
        ]
