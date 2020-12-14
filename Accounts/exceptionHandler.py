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
            data['message']['non_field_errors'] = exc.detail
        elif isinstance(exc.detail, dict):
            data['message'] = exc.detail
        else:
            data['message']['non_field_errors'] = [exc.detail]

        set_rollback()
        return Response(data, status=exc.status_code, headers=headers)
    else:
        data = {'status_code': 500, 'message': {}}
        data['message']['non_field_errors'] = [f'{exc.__class__.__name__}: {exc}']
        return Response(data, status=500)

    return None