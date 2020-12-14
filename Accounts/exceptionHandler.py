# Python
# Django
from django.core.exceptions import PermissionDenied
from django.http import Http404
# Rest Framework
from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework.views import set_rollback
# Local


def exception_handler(exc, context):
    if isinstance(exc, Http404):
        exc = exceptions.NotFound()
    elif isinstance(exc, PermissionDenied):
        exc = exceptions.PermissionDenied()

    if isinstance(exc, exceptions.APIException):
        data = {'status_code': exc.status_code, 'message': {}}
        headers = {}
        if getattr(exc, 'auth_header', None):
            headers['WWW-Authenticate'] = exc.auth_header
        if getattr(exc, 'wait', None):
            headers['Retry-After'] = '%d' % exc.wait

        if isinstance(exc.detail, list):
            data['message'] = exc.detail
        elif isinstance(exc.detail, dict):
            # Have to serialize this dic in a way that we get a list like key-value
            temp_list = []
            i = 0
            for key, value in exc.detail.iteritems():
                temp_list[i] = key + " " + value
                i = i + 1
            data['message'] = temp_list
        else:
            data['message'] = [exc.detail]

        set_rollback()
        return Response(data, status=exc.status_code, headers=headers)
    else:
        data = {'status_code': 500, 'message': {}}
        data['message'] = [f'{exc.__class__.__name__}: {exc}']
        return Response(data, status=500)

    return None