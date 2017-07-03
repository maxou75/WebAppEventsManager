from django.conf.urls import url

from user.views import *

# TODO
urlpatterns = [
    url(r'^create$', createUser, name='user-create'),
    url(r'^searchFbId/(?P<fbId>[\w ]+)/$', getUserByFbId, name='user-getByFbId'),
    url(r'^searchId/(?P<id>[\w ]+)/$', getUserById, name='user-getById')
]