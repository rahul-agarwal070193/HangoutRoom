from django.urls import path
from .views import *

urlpatterns = [
    path('', index),
    path('userroom/<str:code>', index),
    path('login', index),
    path('signup', index),
    path('contact', index),
    path('home', index),
    path('test', test),
]
