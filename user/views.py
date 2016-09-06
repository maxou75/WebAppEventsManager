from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from user.models import User
from user.serializers import UserSerializer

@api_view(['POST'])
def createUser(request):
    user = request.data
    print(user)
    try :
        userFbId = User.objects.get(fbId=user.__getitem__('fbId'))
    except User.DoesNotExist:
        return Response(None, status = status.HTTP_200_OK)
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
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getUserById(request, id=None):
    try:
        event = User.objects.get(id=id);
    except User.DoesNotExist:
        return Response(None, status=status.HTTP_200_OK)
    serializer = UserSerializer(event)
    return Response(serializer.data, status=status.HTTP_200_OK)