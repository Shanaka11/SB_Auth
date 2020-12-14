# Python
# Django
# Rest Framework
from rest_framework import permissions
# Local

class IsVerifiedUser(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user != 'anonymous' and request.user.verified:
            return True
        else:
            return False