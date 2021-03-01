from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import Member
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse


class AllUser(generics.ListAPIView):  # get details about all the user present
    """
    get data of all the user
    - 'id',
    - 'username'
    - 'first_name',
    - 'last_name', 
    - 'email',
    - 'password'
    """
    queryset = Member.objects.all()
    serializer_class = MemberSerializer


class CreateUser(APIView):  # for sign up request
    """
    takes a post request 
    - username
    - first_name
    - last_name
    - email
    - password
    and create a user

    -also store username in session variable 

    """
    serializer_class = CreateMemberSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            email = serializer.data.get('email')
            password = serializer.data.get('password')

            user = Member(email=email, username=username,
                          first_name=first_name, last_name=last_name, password=password)
            user.save()

            # save user id in session variable
            if not self.request.session.exists(self.request.session.session_key):
                self.request.session.create()
            self.request.session['username'] = username

            return Response({'Message': 'Sucess'}, status=status.HTTP_201_CREATED)
        else:
            # print(serializer.errors)
            error = serializer.errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):  # for login request
    """
    get a user data if present
    takes a post request
    - username
    - password
    return
    - id
    - username
    - first_name
    - last_name 
    - email
    - password

    also store username in session variable 
    """
    serializer_class = MemberLoginSerializer

    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        user = Member.objects.filter(username=username, password=password)
        if user.exists():
            data = MemberSerializer(user[0]).data

            # save user id in session variable
            if not self.request.session.exists(self.request.session.session_key):
                self.request.session.create()
            self.request.session['username'] = username

            return Response({'Message': 'Sucess'}, status=status.HTTP_200_OK)
        return Response({'User Not Found': 'Invalid Username or password.'}, status=status.HTTP_404_NOT_FOUND)


class CheckUsername(APIView):  # To check if username alredy exist or not
    """
    take a get request
    -username 
    if user exist
    -return true
    else
    -return false
    """

    def get(self, request, format=None):
        username = request.GET.get('username')
        user = Member.objects.filter(username=username)
        if user.exists():
            return Response("True", status=status.HTTP_200_OK)
        return Response("False", status=status.HTTP_200_OK)


class CheckEmail(APIView):  # To check if Email id alredy exist or not
    """
    take a get request
    -Email id
    if user exist
    -return true
    else
    -return false
    """

    def get(self, request, format=None):
        email = request.GET.get('email')
        user = Member.objects.filter(email=email)
        if user.exists():
            return Response("True", status=status.HTTP_200_OK)
        return Response("False", status=status.HTTP_200_OK)


# class UserDetail(APIView):
#     def get(self, request, format=None):
#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create()
#         username = self.request.session['username']
#         user = Member.objects.filter(username=username)
#         if user.exists():
#             data = MemberSerializer(user[0]).data
#             return Response(data, status=status.HTTP_200_OK)
#         return Response("False", status=status.HTTP_400_BAD_REQUEST)


# class InfoUser(APIView):  # !!!currently not needed!!!
#     serializer_class = GetMemberSerializer

#     def get(self, request, format=None):
#         username = request.GET.get('username')
#         user = Member.objects.filter(username=username)
#         if user.exists():
#             data = MemberSerializer(user[0]).data
#             return Response(data, status=status.HTTP_200_OK)
#         return Response({'User Not Found': 'Invalid Username or password.'}, status=status.HTTP_404_NOT_FOUND)
