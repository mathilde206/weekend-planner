from django.conf.urls import url, include
from .views import CityView

urlpatterns = [
    url(r'^(?P<pk>\d+)$', CityView.as_view(), name='post_rud')
]
