from django.db import models
from django.contrib.auth.models import User
from member.models import Member
import string
import random


def generate_unique_code():
    length = 8

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


"""
room is the model name 
-code(unique 8 digit)
-host(user created username )
-name
-password
-
"""


class Room(models.Model):
    code = models.CharField(
        max_length=8, default=generate_unique_code, unique=True)
    host = models.ForeignKey(Member, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    start = models.IntegerField(default=0, blank=True, null=True)
    end = models.IntegerField(default=0, blank=True, null=True)

    def __str__(self):
        return self.code


"""
Queue is the model name
-code(same as the room code unique)
-song title
-song position
-videoid(youtube video id)
"""


class Queue(models.Model):
    code = models.CharField(max_length=8)
    song_name = models.CharField(max_length=255)
    song_position = models.IntegerField()
    video_id = models.CharField(max_length=15)


"""
user in room model
-username(pk)
-roomcode
"""


class UserInRoom(models.Model):
    user = models.ForeignKey(Member, on_delete=models.CASCADE)
    code = models.ForeignKey(Room, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
