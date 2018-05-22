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
)

from recommendations.pagination import RecommendationPageNumberPagination
from recommendations.permissions import IsOwnerOrReadOnly

from .models import Comment

from .serializers import (
    CommentDetailSerializer,
    CommentSerializer,
    create_comment_serializer,
)


class CommentDetailAPIView(RetrieveAPIView):
    lookup_field = "id"
    queryset = Comment.objects.all()
    serializer_class = CommentDetailSerializer
    permission_classes = [AllowAny]


class CommentListAPIView(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = ['AllowAny']
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['content', 'user_firstname']


class CreateCommentAPIView(CreateAPIView):
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        model_type = self.request.GET.get('type')
        slug = self.request.GET.get('slug')
        parent_id = self.request.GET.get('parent_id', None)
        user = self.request.user

        return create_comment_serializer(
            model_type=model_type,
            slug=slug,
            parent_id=parent_id,
            user=user,
        )
