from django.conf.urls import url

from user.views import *

urlpatterns = [
    url(r'^create$', createUser, name='user-create'),
    url(r'^searchId/(?P<id>[\w ]+)/$', getUserById, name='user-getById')
]