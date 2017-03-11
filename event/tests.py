from collections import OrderedDict

from django.test import TestCase

from event.models import Type

# python manage.py test
from event.serializers import TypeSerializer, EventDeserializer

# It was working before but now throw an ImproperlyConfigured Exception : Requested setting DEFAULT_INDEX_TABLESPACE
# => TO FIX
class monTest(TestCase):
    #type = {'name' : 'Battle'}
   # typeSerializer = TypeSerializer(data = type)
   # if typeSerializer.is_valid():
   #     typeSerializer.save()
   # print(typeSerializer.data)

    type2 = Type.objects.get(name="Battle")
    type2Serializer = TypeSerializer(type2)

    #print(type2Serializer.data)

#    event = Event.objects.create(name="bonjour", fbId='a', startDateTime='l',
#                                 type=type2, description='a', location='l', city='l', country='l', ownerFbId='r', ownerName='r')
#    eventSer = EventSerializer(event)
    #event2=Event.objects.get(name='bonjour')
    #event2Serializer= EventSerializer(event2)
    #typeTest= event2Serializer.data.__getitem__('type')
   # print(type2Serializer.data)
   # print(type2Serializer.data)
    test = OrderedDict([('id', '57c81df259e95c21f80de6e1'), ('name', 'Battle')])

    event = {'name': 'monEVENEMENT', 'fbId' : 'loul', 'startDateTime' : '10:15',
            'type' : [test],
             'description' : 'maDESCRIPTION', 'location' : 'Opera', 'city' : 'new York', 'country' : 'USA', 'ownerFbId' : 'kk', 'ownerName' : 'mm'}
    eventSerializer = EventDeserializer(data=event)
    #print(eventSerializer)
    if eventSerializer.is_valid():
        eventSerializer.save()
    else:
        print(eventSerializer.errors)
    print(eventSerializer.data)