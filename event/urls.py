from django.conf.urls import url

from event.views import *

urlpatterns = [
    url(r'^create$', createEvent.as_view(), name='event-create'),
    url(r'^types$', findEventTypes.as_view(), name='event-types'),
    url(r'^searchName/(?P<name>[\w ]+)/$', findEventsByName.as_view(), name='event-findByName'),
    url(r'^searchFbId/(?P<fbId>[\w ]+)/$', getEventByFacebookId.as_view(), name='event-getByFbId'),
    url(r'^searchId/(?P<id>[\w ]+)/$', getEventById.as_view(), name='event-getById'),
    url(r'^searchCityType/(?P<city>[\w\-]+)/$', findEventsByCityAndType, name='event-findByCityAndType'),
    url(r'^searchCityType/(?P<city>[\w\-]+)/(?P<type>[\w\-]+)$', findEventsByCityAndType, name='event-findByCityAndType')
]