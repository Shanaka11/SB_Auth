# Python
import jwt
import datetime
# Django
from django.conf import settings
from django.middleware.csrf import CsrfViewMiddleware
from django.contrib.auth import login, authenticate, logout
# Rest Framework
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication
# Local
from ..models import User

class CSRFCheck(CsrfViewMiddleware):
    def _reject(self, request, reason):
        # Return the failure reason instead of an HttpRequest
        return reason

class JWTAuthentication(BaseAuthentication):
    
    def authenticate(self, request):
        authorization_header = request.headers.get('Authorization')
        if not authorization_header:
            return None
        try:
            access_token = authorization_header.split(' ')[1]
            payload = jwt.decode(access_token, settings.JWT_AUTH_SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token Expired')
        except IndexError:
            raise exceptions.AuthenticationFailed('Token prefix missing')

        user = User.objects.get(username=payload['username'])

        if user is None:
            raise exceptions.AuthenticationFailed('User not found')
        
        self.enforce_csrf(request)
        return(user, None)
    
    def enforce_csrf(self, request):
        check = CSRFCheck()
        check.process_request(request)
        reason = check.process_view(request, None, (), {})
        if reason:
            # CSRF failed, bail with explicit error message
            raise exceptions.PermissionDenied('CSRF Failed: %s' % reason)

# Token Genaration Class
class TokenHandler():
    # Gen Access Tokens
    def gen_access_token(user):

        contents = {
            'username': user.username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=5),
            'iat': datetime.datetime.utcnow()
        }
        return jwt.encode(contents, settings.JWT_AUTH_SECRET_KEY, algorithm='HS256').decode('utf-8')

    # Gen Refresh Tokens
    def gen_refresh_token(user):
        contents = {
            'username': user.username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow()
        }
        return jwt.encode(contents, settings.JWT_RE_AUTH_SECRET_KEY, algorithm='HS256').decode('utf-8')        