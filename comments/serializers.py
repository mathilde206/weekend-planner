from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType

from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
    ValidationError,
)

from accounts.serializers import UserDetailSerializer

from .models import Comment

User = get_user_model()


# DISCLAIMER: The method below is greatly inspired by the Django course from Coding for Entrepreuneurs
# (although I do understand but probably would not have thought of all that by myself)
# The complexity is useful in case I want comments for the e-commerce section as well as recommendations.

def create_comment_serializer(model_type='recommendation', slug=None, parent_id=None, user=None):
    class CommentCreateSerializer(ModelSerializer):
        class Meta:
            model = Comment
            fields = [
                'content',
                'timestamp',
            ]

        def __init__(self, *args, **kwargs):
            self.model_type = model_type
            self.slug = slug
            self.parent_obj = None
            if parent_id:
                parent_qs = Comment.objects.filter(id=parent_id)
                if parent_qs.exists() and parent_qs.count() == 1:
                    self.parent_obj = parent_qs.first()
            return super(CommentCreateSerializer, self).__init__(*args, **kwargs)

        def validate(self, data):
            model_type = self.model_type
            model_qs = ContentType.objects.filter(model=model_type)
            if not model_qs.exists() or model_qs.count() != 1:
                raise ValidationError('This is not a valid content type')
            # Importing the model based on the content type we dynamically got
            SomeModel = model_qs.first().model_class()
            # Is the slug in the model ?
            obj_qs = SomeModel.objects.filter(slug=self.slug)
            if not obj_qs.exists() or obj_qs.count() != 1:
                raise ValidationError("This is not a valid slug for this content type")
            return data

        def create(self, validated_data):
            content = validated_data.get("content")
            if user:
                main_user = user
            else:
                main_user = User.objects.all().first()
            model_type = self.model_type
            slug = self.slug
            parent_obj = self.parent_obj
            comment = Comment.objects.create_by_model_type(
                model_type,
                slug,
                content,
                main_user,
                parent_obj=parent_obj,
            )
            return comment

    return CommentCreateSerializer


class CommentSerializer(ModelSerializer):
    reply_count = SerializerMethodField()

    def get_reply_count(self, obj):
        if obj.is_parent:
            return obj.children().count()
        else:
            return 0

    class Meta:
        model = Comment
        fields = [
            'id',
            'user',
            'parent',
            'content',
            'timestamp',
            'reply_count',
        ]


class CommentChildSerializer(ModelSerializer):
    user = UserDetailSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = [
            'id',
            'user',
            'content',
            'timestamp'
        ]


class CommentDetailSerializer(ModelSerializer):
    replies = SerializerMethodField()
    user = UserDetailSerializer(read_only=True)

    @staticmethod
    def get_replies(obj):
        if obj.is_parent:
            return CommentChildSerializer(obj.children(), many=True).data
        else:
            return None

    class Meta:
        model = Comment
        fields = [
            'id',
            'user',
            'content',
            'timestamp',
            'replies',
        ]
