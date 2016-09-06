from django.conf.urls import url

from event.views import *

urlpatterns = [
    url(r'^create$', createEvent, name='event-create'),
    url(r'^list$', listEvent, name='event-list'),
    url(r'^types$', findEventTypes, name='event-types'),
    url(r'^searchName/(?P<value>[\w ]+)/$', findEventsByName, name='event-findByName'),
    url(r'^searchFbId/(?P<fbId>[\w ]+)/$', getEventByFacebookId, name='event-getByFbId'),
    url(r'^searchId/(?P<id>[\w ]+)/$', getEventById, name='event-getById'),
    url(r'^searchCityType/(?P<city>[\w\-]+)/$', findEventsByCityAndType, name='event-findByCityAndType'),
    url(r'^searchCityType/(?P<city>[\w\-]+)/(?P<type>[\w\-]+)$', findEventsByCityAndType, name='event-findByCityAndType')
]