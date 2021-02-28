from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('search', index),
    path('room', index),
    path('login', index),
    path('signup', index),
    path('contact', index),
    path('home', index),
]
