from django.db import models
from django.conf import settings

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class CommentManager(models.Manager):
    def all(self):
        """
        We override the all method to make sure we only get the comments and not the replies
        """
        qs = super(CommentManager, self).filter(parent=None)
        return qs

    def filter_by_instance(self, instance):
        """
        Here we return the query string for a particular instance (will be determined in the view)
        """
        content_type = ContentType.objects.get_for_model(instance.__class__)
        object_id = instance.id
        qs = super(CommentManager, self).filter(content_type=content_type, object_id=object_id).filter(parent=None)
        return qs

    def create_by_model_type(self, model_type, slug, content, user, parent_obj=None):
        """
        This method checks that the model for which we want to create a comment exists, and that this model has the unique slug.
        If so, we create the comment.
        """
        model_qs = ContentType.objects.filter(model = model_type)
        if model_qs.exists():
            SomeModel = model_qs.first().model_class()
            obj_qs = SomeModel.objects.filter(slug=slug)
            if obj_qs.exists() and obj_qs.count() == 1:
                # Finally we can create the comment
                instance = self.model()
                instance.content = content
                instance.user = user
                instance.model_type = model_qs.first()
                instance.object_id = obj_qs.first().id
                if parent_obj:
                    instance.parent = parent_obj
                instance.save()

                return instance
        return None


class Comment(models.Model):
    """
    This class allows us to create comments for any type of content (not just recommendations) with generic foreign keys
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True)
    object_id = models.PositiveIntegerField(null=True)
    content_object = GenericForeignKey('content_type', 'object_id')
    parent = models.ForeignKey("self", null=True, blank=True)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = CommentManager()

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return str(self.content)

    def children(self):
        return Comment.objects.filter(parent=self)

    @property
    def is_parent(self):
        # If the comment has a parent, then it is a child.
        if self.parent is not None:
            return False
        else:
            return True