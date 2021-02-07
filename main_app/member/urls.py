from django.urls import path
from . import views
from .views import register_user, edit_user, password_change
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('register/', register_user.as_view(), name='register'),
    path('edit_profile/', edit_user.as_view(), name='edit_profile'),
    path('password/', password_change.as_view(), name='password_change'),
]
