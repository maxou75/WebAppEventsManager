from rest_framework.views import APIView
# rest_framework_mongoengine has the same behavior that rest_framework but adapted to MongoDB collections and documents
from rest_framework_mongoengine import generics

from event.serializers import EventSerializer, TypeSerializer, EventDeserializer
from mongoengine.queryset.visitor import Q
from rest_framework.response import Response
from event.models import Event, Type


# You should check the Django Rest Framework doc to understand what generics classes do

# Create an event with parameters
class createEvent(generics.CreateAPIView):
    serializer_class = EventDeserializer

# Generics class are easy and practical but not good to debug and control => probably better to write your own method
"""
@api_view(['POST'])
def createEvent(request):
    event = request.data
    print(event)
    serializer = EventDeserializer(data=event)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    # else
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    """


# Return all the Events objects which match with the name parameter
class findEventsByName(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        name = self.kwargs['name']
        # Let's return any events that name or location contains the string parameter
        return Event.objects.filter(Q(name__icontains=name) | Q(location__icontains=name))


# Return a single event corresponding to the ID
class getEventById(generics.RetrieveAPIView):
    serializer_class = EventSerializer
    queryset = Event.objects.all()


# Return a single event corresponding to the facebook ID
# No generic view : the view must NOT return a 404 error if the object does not exist but return null
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


# TODO
def findEventsByCityAndType(request, city=None, type=None):
    if type:
        events = Event.objects.filter(city=city)  # , type=type)
    else:
        print(city)
        events = Event.objects.filter(city=city)
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)
