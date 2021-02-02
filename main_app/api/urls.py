from django.urls import path
from .views import *

urlpatterns = [
    path('search', YoutubeSearch.as_view()),
]
