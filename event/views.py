from event.serializers import EventSerializer, TypeSerializer, EventDeserializer
from mongoengine.queryset.visitor import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from event.models import Event, Type


@api_view(['POST'])
def createEvent(request):
    event = request.data
    print(event)
    try :
        eventFbId = Event.objects.get(fbId=event.__getitem__('fbId'))
    except Event.DoesNotExist:
        eventFbId=None
    if eventFbId:
        return Response("Ajout impossible : Evenement déjà importé", status.HTTP_400_BAD_REQUEST)
    if not event.__getitem__('name') or not event.__getitem__('startDateTime') or not event.__getitem__('location') \
            or not event.__getitem__('city') or not event.__getitem__('country') or not event.__getitem__('description') \
            or not event.__getitem__('type'):
        return Response('Ajout impossible : Champs manquants', status = status.HTTP_400_BAD_REQUEST)
    serializer = EventDeserializer(data=event)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def listEvent(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getEventById(request, id=None):
    if not id:
        return Response(None)
    try:
        event = Event.objects.get(id=id);
    except Event.DoesNotExist:
        return Response(None)
    serializer = EventSerializer(event)
    return Response(serializer.data)

@api_view(['GET'])
def getEventByFacebookId(request, fbId=None):
    if not fbId:
        return Response(None)
    try:
        event = Event.objects.get(fbId=fbId);
    except Event.DoesNotExist:
        return Response(None)
    serializer = EventSerializer(event)
    return Response(serializer.data)

#Return all the Event objects which match with the name parameter
@api_view(['GET'])
def findEventsByName(request, value=None):
    if not value:
        return Response(None)
    events = Event.objects.filter(Q(name__icontains=value) | Q(location__icontains=value) | Q(ownerName__icontains=value))
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def findEventsByCityAndType(request, city=None, type=None):
    if type :
        events = Event.objects.filter(city=city)#, type=type)
    else :
        print(city)
        events = Event.objects.filter(city=city)
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

# Events types
@api_view(['GET'])
def findEventTypes(request):
    types = Type.objects.all()
    serializer = TypeSerializer(types, many=True)
    return Response(serializer.data)