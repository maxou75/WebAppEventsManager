from mongoengine import Document, StringField

class User(Document):
    fbId = StringField(max_length=50, required=True, Unique=True)
    name = StringField(max_length=50, required=True)