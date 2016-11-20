from mongoengine import DoesNotExist
from rest_framework.views import APIView
from rest_framework_mongoengine import generics

from event.serializers import EventSerializer, TypeSerializer, EventDeserializer
from mongoengine.queryset.visitor import Q
from rest_framework.response import Response
from event.models import Event, Type
from django.http import HttpResponse
from django.shortcuts import get_object_or_404 as _get_object_or_404


#Create an event with parameters
class createEvent(generics.CreateAPIView) :
    serializer_class = EventDeserializer

#Return all the Events objects which match with the name parameter
class findEventsByName(generics.ListAPIView):
    serializer_class = EventSerializer
    def get_queryset(self):
        name = self.kwargs['name']
        return Event.objects.filter(Q(name__icontains=name) | Q(location__icontains=name))

#Return a single event corresponding to the ID
class getEventById(generics.RetrieveAPIView):
    serializer_class = EventSerializer
    queryset= Event.objects.all()

#Return a single event corresponding to the facebook ID
#No generic view : the view must no return a 404 error if the object does not exist
class getEventByFacebookId(APIView):
    def get(self, request, fbId, format=None):
        try:
            event = Event.objects.get(fbId=fbId)
        except Event.DoesNotExist:
            return Response(None)
        return Response(EventSerializer(event).data)

# Events types
class findEventTypes(generics.ListAPIView):
    serializer_class = TypeSerializer
    queryset = Type.objects.all()

#
def findEventsByCityAndType(request, city=None, type=None):
    if type:
        events = Event.objects.filter(city=city)  # , type=type)
    else:
        print(city)
        events = Event.objects.filter(city=city)
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)