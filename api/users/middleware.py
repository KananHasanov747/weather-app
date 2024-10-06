from django.http import HttpResponseForbidden
from django.utils.deprecation import MiddlewareMixin


class RestrictApiAccessMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if (
            request.path.startswith("/api")
            and not (request.user.is_staff or request.user.is_superuser)
            and "application/json" not in request.headers.get("Accept")
        ):
            return HttpResponseForbidden("Access forbidden.")
        return None
