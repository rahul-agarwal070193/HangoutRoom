from rest_framework import serializers
from .models import Member


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('username', 'first_name',
                  'last_name', 'email', 'password')


class CreateMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('username', 'first_name',
                  'last_name', 'email', 'password')


class GetMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('username', 'password')


class InfoMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('username')
