from django.shortcuts import render

# Create your views here.


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')


def test(request, exception=True):
    user = request.session['username']
    print(user)
    return render(request, 'frontend/error.html')


def error(request, exception):
    return render(request, 'error.html')
