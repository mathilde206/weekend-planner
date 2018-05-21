from django.conf.urls import url, include
from .views import (
    CityCreateView,
    CityListView,
    CityRetrieveView,
)

urlpatterns = [
    url(r'^$', CityListView.as_view(), name='city_list'),
    url(r'^(?P<pk>\d+)/$', CityRetrieveView.as_view(), name='city_retrieve'),
    url(r'^create/$', CityCreateView.as_view(), name='city_create')
]


# TODO: how does it work for cities with several words.. encode uri ?
