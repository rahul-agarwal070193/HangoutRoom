from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from isodate import parse_duration
import requests
from django.shortcuts import render, redirect


class YoutubeSearch(APIView):
    def get(self, request, format=None):
        videos = []
        youtube_key = "AIzaSyDWu_p2DWhOO7MGvFBXu9HkCX8WNaLdEg8"
        search_url = 'https://www.googleapis.com/youtube/v3/search'
        video_url = 'https://www.googleapis.com/youtube/v3/videos'
        search = request.GET.get("search")
        # getting the video id from the search
        search_params = {
            'part': 'snippet',
            'q': search,  # search name
            'key': youtube_key,  # my youtube api key
            'maxResults': 10,  # number of result
            'type': 'video',  # show only video result
        }
        r = requests.get(search_url, params=search_params)
        results = r.json()['items']
        # print(results)
        # storing video id in video_ids[]
        video_ids = []
        for result in results:
            video_ids.append(result['id']['videoId'])
        # print(video_ids)

        video_params = {
            'key': youtube_key,
            'part': 'snippet,contentDetails',
            'id': ','.join(video_ids),
            'maxResults': 10
        }

        r = requests.get(video_url, params=video_params)

        results = r.json()['items']
        # getting video data
        for result in results:
            # print(result['snippet']['channelTitle'])
            video_data = {
                'title': result['snippet']['title'],
                'id': result['id'],
                'url': f'https://www.youtube.com/watch?v={ result["id"] }',
                'duration': int(parse_duration(result['contentDetails']['duration']).total_seconds() // 60),
                'thumbnail': result['snippet']['thumbnails']['high']['url'],
                'channel_name': result['snippet']['channelTitle']
            }
            videos.append(video_data)
        return Response(videos, status=status.HTTP_200_OK)
