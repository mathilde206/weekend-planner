from django.conf.urls import url

from .views import (
    CommentListAPIView,
    CommentDetailAPIView,
    CreateCommentAPIView,)

urlpatterns = [
    url(r'^$', CommentListAPIView.as_view(), name='comments'),
    url(r'(?P<id>\d+)/$', CommentDetailAPIView.as_view(), name='thread'),
    url(r'^create/$', CreateCommentAPIView.as_view(), name='create_comment')
]
