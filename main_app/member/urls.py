from django.urls import path
from . import views
from .views import *
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('user', AllUser.as_view(), name='user'),
    path('register', CreateUser.as_view(), name='register'),
    path('user-login', UserLogin.as_view(), name='login'),
    path('check-user', CheckUsername.as_view(), name='username'),
    path('check-email', CheckEmail.as_view(), name='email'),
    # path('user_detail', UserDetail.as_view(), name='userdetail'),
    # path('edit_profile/', edit_user.as_view(), name='edit_profile'),
    # path('password/', password_change.as_view(), name='password_change'),
]
