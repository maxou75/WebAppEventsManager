from mongoengine import Document, StringField

# TODO : add missing parameters
class User(Document):
    fbId = StringField(max_length=50, null=True, blank=True, unique=True)
    name = StringField(max_length=50, required=True)
