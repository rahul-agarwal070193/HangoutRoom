from rest_framework import serializers
from .models import *


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'name', 'password', 'host')


class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('code', 'name')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('name', 'password')


class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = Room
        fields = ('name', 'password')


class QueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Queue
        fields = ('code', 'song_name', 'video_id')


class QueueAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = Queue
        fields = ('song_name', 'video_id')
