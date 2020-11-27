# Django
from django.urls import path, include
# Restframework
from rest_framework.routers import DefaultRouter
# Local
from .api.UserApi import UserApi


router = DefaultRouter()
router.register('', UserApi, basename='user')

urlpatterns = [
    path('', include( router.urls )),
]
