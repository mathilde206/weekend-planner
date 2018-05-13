from django.db import models
from django.db.models.signals import pre_save
from django.conf import settings
from django.utils.text import slugify

from django.contrib.contenttypes.models import ContentType

from comments.models import Comment
from cities.models import City


# TODO: Once I add the city field, need to update the location to --> <city>/filename
def upload_location(instance, filename):
    return "%s/%s" %(instance.city, filename)

class RecommendationManager(models.Manager):
    def active(self, *args, **kwargs):
        """
        This function allow us to retrieve posts which are not draft
        """
        return super(RecommendationManager, self).filter(draft=False)

class Recommendation(models.Model):
    BUDGET_CHOICES = (
        ('Cheap', '$'),
        ('Affordable', '$$'),
        ('Expensive', '$$$'),
        ('Very_Expensive', '$$$$')
    )

    # Meta data for the recommendation
    title = models.CharField(max_length=120)
    draft = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    slug = models.SlugField(unique=True)
    updated_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1)
    views = models.IntegerField(default=0)
    image = models.ImageField(
        upload_to=upload_location,
        blank=True,
        null=True)
    # TODO: Figure out how this works (and if I need it)
    # height_field = models.IntegerField(default=0, editable=False)
    # width_field = models.IntegerField(default=0, editable=False)

    # General Recommendation Information
    budget = models.CharField(
        max_length= 15,
        choices=BUDGET_CHOICES,
        default='Affordable',
    )
    # TODO: remove nullable for city once I'm ready to reinitalize the db
    city = models.ForeignKey(City, on_delete=models.CASCADE, null = True)
    number_of_days = models.IntegerField(default=1)

    # Content of the recommendation
    content_day1 = models.TextField()
    content_day2 = models.TextField(null=True, blank=True)
    content_day3 = models.TextField(null=True, blank=True)

    objects = RecommendationManager()

    def __str__(self):
        return self.title

    @property
    def comments(self):
        instance = self
        qs = Comment.objects.filter_by_instance(instance)
        return qs

    @property
    def get_content_type(self):
        instance = self
        content_type = ContentType.objects.get_for_model(instance.__class__)
        return content_type

def create_slug(instance, new_slug=None):
    """
    This recursive function will ensure that we create a unique slug (in case several recommendations have the same title
    """
    slug= slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = Recommendation.objects.filter(slug=slug).order_by('-id')
    exists = qs.exists()
    if exists:
        new_slug = "{0}-{1}".format(slug, qs.first().id)
        return create_slug(instance, new_slug = new_slug)
    return slug


def pre_save_recommendation_receiver(sender, instance, *args, **kwargs):
    """
    This function will be called before the new instance is saved in the database and will add the slug which can't be added by the user.
    """
    if not instance.slug:
        instance.slug = create_slug(instance)

pre_save.connect(pre_save_recommendation_receiver, sender=Recommendation)