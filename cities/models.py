from django.db import models

# Create your models here.
class City(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=200)
    currency = models.CharField(max_length=10)
    # Todo : make a model for languages ?
    language = models.CharField(max_length=20)

    def __str__(self):
        return self.name