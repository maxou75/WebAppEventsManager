from mongoengine import Document, StringField


class User(Document):
    fbId = StringField(max_length=50, null=True, blank=True, unique=True)
    name = StringField(max_length=50, required=True)
