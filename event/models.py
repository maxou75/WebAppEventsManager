from mongoengine import *


class Type(Document):
    name = StringField(max_length=40)


class Event(Document):
    name = StringField(max_length=100, required=True)
    # An event can be created without being imported from FB but if it is, its FB id must be unique
    fbId = StringField(max_length=50, null=True, blank=True)
    startDateTime = StringField(max_length=50, required=True)
    createDateTime = DateTimeField(input_formats=['%Y-%m-%d %H:%M'])
    # The Event Type is a reference to a Type object from the Database
    type = ReferenceField(Type, required=True)
    description = StringField(max_length=5000, required=True)
    location = StringField(max_length=100, required=True)
    city = StringField(max_length=50, required=True)
    country = StringField(max_length=50, required=True)
    owner = StringField(max_length=50)
