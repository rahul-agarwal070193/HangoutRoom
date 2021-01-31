import requests

from isodate import parse_duration

# from django.conf import settings
from django.shortcuts import render, redirect

youtube_key = "AIzaSyDWu_p2DWhOO7MGvFBXu9HkCX8WNaLdEg8"


def index(request):
    videos = []
    search_url = 'https://www.googleapis.com/youtube/v3/search'
    video_url = 'https://www.googleapis.com/youtube/v3/videos'

    search_params = {
        'part': 'snippet',
        'q': 'song',  # search name
        'key': youtube_key,  # my youtube api key
        'maxResults': 9,  # number of result
        'type': 'video'  # show only video result
    }

    r = requests.get(search_url, params=search_params)

    results = r.json()['items']

    video_ids = []
    for result in results:
        video_ids.append(result['id']['videoId'])
    print(video_ids)

    video_params = {
        'key': youtube_key,
        'part': 'snippet,contentDetails',
        'id': ','.join(video_ids),
        'maxResults': 9
    }

    r = requests.get(video_url, params=video_params)

    results = r.json()['items']

    for result in results:
        video_data = {
            'title': result['snippet']['title'],
            'id': result['id'],
            'url': f'https://www.youtube.com/watch?v={ result["id"] }',
            'duration': int(parse_duration(result['contentDetails']['duration']).total_seconds() // 60),
            'thumbnail': result['snippet']['thumbnails']['high']['url']
        }
        print(video_data['url'])
        videos.append(video_data)

    # print(videos)
    context = {
        'videos': videos
    }
    # print(context)
    # return Response(song, status=status.HTTP_200_OK)
    return render(request, 'frontend/index.html')
