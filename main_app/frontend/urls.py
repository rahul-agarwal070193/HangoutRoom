from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('search', index),
    path('userroom/<str:code>', index),
    path('login', index),
    path('signup', index),
    path('contact', index),
    path('home', index),
]
