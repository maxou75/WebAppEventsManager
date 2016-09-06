from mongoengine import *


class Type(Document):
    name = StringField(max_length=40)

class Event(Document):
    name = StringField(max_length=20, required=True)
    fbId = StringField(max_length=50)
    startDateTime = StringField(max_length=50,required=True)
    createDateTime = DateTimeField
    type = ReferenceField(Type, required=True)
    description = StringField(max_length=200, required=True)
    location = StringField(max_length=100, required=True)
    city = StringField(max_length=50, required=True)
    country = StringField(max_length=50, required=True)
    owner = StringField(max_length=50)

