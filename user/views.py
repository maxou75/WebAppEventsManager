from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from user.models import User
from user.serializers import UserSerializer


# TODO

@api_view(['POST'])
def createUser(request):
    user = request.data
    print(user)
    if not user.__getitem__('name') or not user.__getitem__('fbId'):
        return Response('Ajout impossible : Champs manquants', status=status.HTTP_400_BAD_REQUEST)
    serializer = UserSerializer(data=user)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getUserByFbId(request, fbId=None):
    try:
        event = User.objects.get(fbId=fbId)
    except User.DoesNotExist:
        return Response(None, status=status.HTTP_200_OK)
    serializer = UserSerializer(event)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getUserById(request, id=None):
    try:
        event = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(None, status=status.HTTP_200_OK)
    serializer = UserSerializer(event)
    return Response(serializer.data, status=status.HTTP_200_OK)
