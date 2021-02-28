from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import *
from member.serializers import *
from member.models import Member
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse


class RoomView(generics.ListAPIView):  # get all basic data of the all room
    """
    get data of all the room
    -'id',
    -'code',
    -'name', 
    -'password',
    -'host'
    """
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class CreateRoomView(APIView):  # create a room
    """
    takes a post request 
    - name
    - password
    and create a room using current_user(from the session variable)

    -also create user in room 
    -from current username
    -room created 
    """
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):

        # check if sesion exist if not create session
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # variable creation
            name = serializer.data.get('name')
            password = serializer.data.get('password')
            username = self.request.session['username']  # current username
            queryset = Member.objects.filter(username=username)
            host = queryset[0]
            # create room object
            room = Room(host=host, name=name, password=password)
            room.save()
            stuff = UserInRoom(user=host, code=room)
            stuff.save()
            # self.request.session['room_code'] = room.code
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class GetRoom(APIView):  # get basic data relate to a particular room
    """
    get data relate to a particular room
    takes a post request
    -code of the room
    return
    - id 
    - name
    - code
    - password
    - host
    """
    serializer_class = CodeSerializer
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        code = request.data.get(self.lookup_url_kwarg)
        room = Room.objects.filter(code=code)
        if room.exists():
            data = RoomSerializer(room[0]).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class RoomUser(APIView):  # get all the user present in the room
    """
    get all the user present in the room
    it take code of the room as the post request
    """
    lookup_url_kwarg = 'code'
    serializer_class = CodeSerializer

    def post(self, request, format=None):
        code = request.data.get('code')
        print(code)
        if(code == None):
            return JsonResponse("code invalid", status=status.HTTP_400_BAD_REQUEST)
        else:
            queryset = Room.objects.filter(code=code)
            room = queryset[0]
            data = UserInRoom.objects.filter(code=room)
            print(data)
            result = []
            if data.exists():
                for _ in data:
                    result.append(MemberSerializer(_.user).data)
                return Response(result, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Room does not exist'}, status=status.HTTP_200_OK)


class JoinRoom(APIView):  # user can join  a room
    """
    user can join  a room
    takes a post request
    -code
    take current user from session variable
    add user to user in room table
    """
    lookup_url_kwarg = 'code'
    serializer_class = CodeSerializer

    def post(self, request, format=None):
        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if room_result.exists():
                room = room_result[0]  # room to be added
                username = self.request.session['username']  # current username
                queryset = Member.objects.filter(username=username)
                host = queryset[0]
                if UserInRoom.objects.filter(code=room, user=host).exists():
                    return Response({'message': 'already in room'}, status=status.HTTP_200_OK)
                else:
                    stuff = UserInRoom(user=host, code=room)
                    stuff.save()
                    return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)


class CheckUserInRoom(APIView):  # check if a user is in a room or not
    """
    take username from session varbiable
    -code as post request
    -return true if user in room
    -else false
    """

    def post(self, request, format=None):
        username = self.request.session['username']  # current username
        queryset = Member.objects.filter(username=username)
        host = queryset[0]
        code = request.data.get('code')
        queryset = Room.objects.filter(code=code)
        room = queryset[0]
        data = UserInRoom.objects.filter(user=host, code=room)
        if(data.exists()):
            return Response("true", safe=False, status=status.HTTP_200_OK)
        else:
            return Response("false", status=status.HTTP_400_BAD_REQUEST)


class DeleteRoom(APIView):  # delete a room
    """
    delete the room
    """
    lookup_url_kwarg = 'code'
    serializer_class = CodeSerializer

    def post(self, request, format=None):
        code = request.data.get(self.lookup_url_kwarg)
        room = Room.objects.filter(code=code)
        if room.exists():
            room.delete()
            return Response({'message': 'Room deleted'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'message': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)


class LeaveRoom(APIView):  # user to leave a room
    """
    -take room code as request
    -find if room exist or not 
    -if exist
        -find current user 
        -if user is host delete room 
        -if not delete user and room from user in  room table
    -else
        -bad request
    """
    lookup_url_kwarg = 'code'
    serializer_class = CodeSerializer

    def post(self, request, format=None):
        code = request.data.get('code')
        if code != None:
            room_result = Room.objects.filter(code=code)
            if room_result.exists():
                room = room_result[0]
                username = self.request.session['username']  # current username
                queryset = Member.objects.filter(username=username)
                current_user = queryset[0]
                if current_user == room.host:  # !!!!!!!!!!
                    room.delete()
                else:
                    stuff = UserInRoom.objects.filter(
                        user=current_user, code=room)
                    if(stuff.exists()):
                        stuff[0].delete()
                        return Response({'message': 'Removed from Room'}, status=status.HTTP_200_OK)
                    else:
                        return Response({'message': 'Already Removed from Room'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)


class UserRoom(APIView):  # all the room that user is a part of
    """
    all the room that user is a part of 
    only the current user room data can be extracted
    """

    def get(self, request, format=None):
        username = self.request.session['username']  # current username
        queryset = Member.objects.filter(username=username)
        host = queryset[0]
        data = UserInRoom.objects.filter(user=host)
        if data.exists():
            result = []
            for _ in data:
                result.append(RoomSerializer(_.code).data)
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Currently not part of any room"}, status=status.HTTP_204_NO_CONTENT)


class UpdateRoom(APIView):  # !!!!!!!!!!!!!currently not needed!!!!!!!!!!!!!
    # upadate a room relate data

    serializer_class = UpdateRoomSerializer

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            code = serializer.data.get('code')

            queryset = Room.objects.filter(code=code)
            if not queryset.exists():
                return Response({'msg': 'Room not found.'}, status=status.HTTP_404_NOT_FOUND)

            room = queryset[0]
            user_id = self.request.session.session_key
            if room.host != user_id:
                return Response({'msg': 'You are not the host of this room.'}, status=status.HTTP_403_FORBIDDEN)

            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)
