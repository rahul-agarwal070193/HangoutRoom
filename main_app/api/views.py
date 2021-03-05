from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from isodate import parse_duration
import requests
from django.shortcuts import render, redirect

# return json containing the search details(title,id,url,thumbnail image,channel name)


class YoutubeSearch(APIView):
    def get(self, request, format=None):
        # all constant parameter
        videos = []  # stores all the search details asked
        youtube_key = "AIzaSyDWu_p2DWhOO7MGvFBXu9HkCX8WNaLdEg8"  # youtube api key
        search_url = 'https://www.googleapis.com/youtube/v3/search'  # search url link
        video_url = 'https://www.googleapis.com/youtube/v3/videos'  # video url link
        search = request.GET.get("search")  # keyword search

        # getting the video id from the search
        search_params = {
            'part': 'snippet',
            'q': search,  # search name
            'key': youtube_key,  # my youtube api key
            'maxResults': 10,  # number of result
            'type': 'video',  # show only video result
            # 'topicId': '/m/04rlf',  # search only music related video
            'relevanceLanguage': "en",
            'videoEmbeddable': "true",  # for video to be playable in website
            'videoSyndicated': "true",
        }
        # sending request to the youtube
        r = requests.get(search_url, params=search_params)
        # if an error is present response with the error like quota limit exceded
        if 'error' in r:
            return Response(r.json(), status=status.HTTP_403_FORBIDDEN)
        results = r.json()["items"]
        for result in results:
            video_data = {
                # video title
                'title': result['snippet']['title'],
                # video id
                'id': result['id']["videoId"],
                # youtube url
                'url': f'https://www.youtube.com/watch?v={ result["id"]["videoId"]}',
                # # video duration if needed video id must be called
                # 'duration': int(parse_duration(result['contentDetails']['duration']).total_seconds() // 60),
                # video thumbnail image
                'thumbnail': result['snippet']['thumbnails']['default']['url'],
                # channel name
                'channel_name': result['snippet']['channelTitle']
            }
            videos.append(video_data)
        return Response(videos, status=status.HTTP_200_OK)

        # # storing video id in video_ids[]
#         for result in results:
#             video_ids.append(result['id']['videoId'])

#         video_params = {
#             'key': youtube_key,
#             'part': 'snippet,contentDetails',
#             'id': ','.join(video_ids),
#             'maxResults': 10
#         }

#         r = requests.get(video_url, params=video_params)

#         # if an error is present response with the error like quota limit exceded
#         if 'error' in r:
#             return Response(r.json(), status=status.HTTP_403_FORBIDDEN)

#         results = r.json()['items']

#         # getting video data
#         for result in results:
#             video_data = {
#                 # video title
#                 'title': result['snippet']['title'],
#                 # video id
#                 'id': result['id'],
#                 # youtube url
#                 'url': f'https://www.youtube.com/watch?v={ result["id"] }',
#                 # video duration
#                 'duration': int(parse_duration(result['contentDetails']['duration']).total_seconds() // 60),
#                 # video thumbnail image
#                 'thumbnail': result['snippet']['thumbnails']['high']['url'],
#                 # channel name
#                 'channel_name': result['snippet']['channelTitle']
#             }
#             videos.append(video_data)
#         return Response(videos, status=status.HTTP_200_OK)
