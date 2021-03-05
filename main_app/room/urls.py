from django.urls import path
from . import views
from .views import *
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', CheckUserInRoom.as_view()),
    path('all-user-in-room', RoomUser.as_view()),
    path('all-room-of-user', UserRoom.as_view()),
    path('delete-room', DeleteRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('queue-end', QueueEnd.as_view()),
    path('queue-start', QueueStart.as_view()),
    path("queue", GetQueue.as_view())
    # path('update-room', UpdateRoom.as_view()),
]
