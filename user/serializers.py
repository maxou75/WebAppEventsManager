from rest_framework_mongoengine.serializers import DocumentSerializer

from user.models import User


class UserSerializer(DocumentSerializer):
    class Meta:
        model = User