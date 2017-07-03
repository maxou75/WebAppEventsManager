from rest_framework_mongoengine.fields import ReferenceField
from rest_framework_mongoengine.serializers import DocumentSerializer

from event.models import Event, Type


class TypeSerializer(DocumentSerializer):
    class Meta:
        model = Type


# I couldn't manage for now to have a unique serializer that create an event with just the object id
# for the type and return events with the entire type object => Serializer and Deserializer
# TO BE FIXED IF BETTER SOLUTION

# Used to create events
class EventSerializer(DocumentSerializer):
    class Meta:
        model = Event
        depth = 2


# Used to retrieve events
class EventDeserializer(DocumentSerializer):
    type = ReferenceField(Type)

    # type = TypeSerializer()
    class Meta:
        model = Event
        depth = 2


"""
    def create(self, validated_data):
        print(validated_data)
        #type=validated_data.pop('type')
        #print(type.values())
        test = OrderedDict([('id', '57c81df259e95c21f80de6e1'), ('name', 'Battle')])
       # typeObject=Type.objects.get(id=type)

        #description=validated_data.pop('description')
        event = Event.objects.create(**validated_data)
        event.save()
        return event
"""
