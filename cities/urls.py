from django.conf.urls import url, include
from .views import CityRetrieveView, CityCreateView

urlpatterns = [
    url(r'(?P<name>[\w-]+)$', CityRetrieveView.as_view(), name='city_retrieve'),
    url(r'^create/$', CityCreateView.as_view(), name='city_create')
]


# TODO: how does it work for cities with several words.. encode uri ?