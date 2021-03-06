"""weekend_planner URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.conf import settings

from django.contrib import admin
from cities import urls as cities_urls
from recommendations import urls as recommendations_urls
from comments import urls as comments_urls
from accounts import urls as users_urls
from frontend.views import FrontEndRenderView


from .settings import DEBUG

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'api/cities/', include(cities_urls)),
    url(r'api/comments/', include(comments_urls, namespace='comments-api')),
    url(r'api/recommendations/', include(recommendations_urls, namespace='recommendations-api')),
    url(r'api/users/', include(users_urls, namespace='users-api')),
]

# A catch all url pattern that will render the React app
# TODO: have the frontend handle 404.
urlpatterns += [
    url(r'(?P<path>.*)', FrontEndRenderView.as_view(), name='home')
]

if DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
