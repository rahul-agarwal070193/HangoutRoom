from django.db import models
from django.contrib.auth.models import User
import string
import random


def generate_unique_code():
    length = 8

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code

# Create your models here.


class Room(models.Model):
    code = models.CharField(
        max_length=8, default=generate_unique_code, unique=True)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    # host = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)


class Queue(models.Model):
    code = models.CharField(max_length=8)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    password = models.CharField(max_length=50)
