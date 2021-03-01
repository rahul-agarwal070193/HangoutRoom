from django.db import models


class Member(models.Model):
    email = models.EmailField(primary_key=True, unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username
