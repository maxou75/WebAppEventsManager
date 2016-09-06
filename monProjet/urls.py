"""monProjet URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
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
from django.views.generic import TemplateView

import event.urls
import user.urls

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="index.html")),
    url(r'^createEvent/$', TemplateView.as_view(template_name="createEvent.html")),
    url(r'^listEvent/$', TemplateView.as_view(template_name="listEvent.html")),
    url(r'^search/(?P<value>[\w ]+)/$', TemplateView.as_view(template_name="searchNameEvent.html")),
    url(r'^search/$', TemplateView.as_view(template_name="searchNameEvent.html")),
    url(r'^event/(?P<eventId>[\w ]+)/$', TemplateView.as_view(template_name="detailEvent.html")),
    url(r'^event/$', TemplateView.as_view(template_name="detailEvent.html")),
    url(r'^rest/event/', include(event.urls)),
    url(r'^rest/user/', include(user.urls))
]
