# Python
# Django
# Rest Framework
from rest_framework import serializers
# Local
from ..models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model =User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'verified']