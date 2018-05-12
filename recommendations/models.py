from django.db import models
from django.db.models.signals import pre_save
from django.conf import settings
from django.utils.text import slugify

from cities.models import City

def upload_location(instance, filename):
    return "%s/%s" %(instance.city, filename)

class RecommendationManager(models.Manager):
    def active(self, *args, **kwargs):
        return super(RecommendationManager, self).filter(draft=False)

class Recommendation(models.Model):

    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    # city = models.ForeignKey(City, default=Europe)
    image = models.ImageField(
        upload_to=upload_location,
        blank=True,
        null=True)
    # height_field = models.IntegerField(default=0, editable=False)
    # width_field = models.IntegerField(default=0, editable=False)
    number_of_days = models.IntegerField(default=1)
    content_day1 = models.TextField()
    content_day2 = models.TextField(null=True, blank=True)
    content_day3 = models.TextField(null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, default=1)
    views = models.IntegerField(default=0)
    draft = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now_add=True)

    objects = RecommendationManager()

    def __str__(self):
        return self.title

def create_slug(instance, new_slug=None):
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
    if not instance.slug:
        instance.slug = create_slug(instance)

pre_save.connect(pre_save_recommendation_receiver, sender=Recommendation)