from rest_framework_mongoengine.fields import ReferenceField
from rest_framework_mongoengine.serializers import DocumentSerializer

from event.models import Event, Type

class TypeSerializer(DocumentSerializer):
    class Meta:
        model = Type

class EventSerializer(DocumentSerializer):
    class Meta:
        model = Event
        depth = 2

class EventDeserializer(DocumentSerializer):
    type = ReferenceField(Type)
    #type = TypeSerializer()
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