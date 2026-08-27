from django.db import transaction
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from audit.models import AuditLog
from audit.services import log_audit_event

from .models import User
from .serializers import CurrentUserSerializer, LogoutSerializer


class AuditedTokenObtainPairView(TokenObtainPairView):
    throttle_classes = (ScopedRateThrottle,)
    throttle_scope = "auth_login"

    def get_serializer(self, *args, **kwargs):
        serializer = super().get_serializer(*args, **kwargs)
        if "data" in kwargs:
            self.login_serializer = serializer
        return serializer

    @staticmethod
    def _get_failed_login_resource(request):
        submitted_email = request.data.get(User.USERNAME_FIELD)
        if isinstance(submitted_email, str):
            normalized_email = User.objects.normalize_email(submitted_email.strip())
            known_user = User.objects.filter(email__iexact=normalized_email).first()
            if known_user is not None:
                return known_user

        return User(email="Unknown user")

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
        except AuthenticationFailed:
            log_audit_event(
                user=None,
                action=AuditLog.Action.LOGIN_FAILED,
                resource=self._get_failed_login_resource(request),
                old_values=None,
                new_values=None,
                request=request,
            )
            raise

        authenticated_user = self.login_serializer.user
        log_audit_event(
            user=authenticated_user,
            action=AuditLog.Action.LOGIN,
            resource=authenticated_user,
            old_values=None,
            new_values=None,
            request=request,
        )
        return response


class CurrentUserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = CurrentUserSerializer(request.user)
        return Response(serializer.data)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            with transaction.atomic():
                refresh_token = RefreshToken(serializer.validated_data["refresh"])
                token_user_id = refresh_token.get(api_settings.USER_ID_CLAIM)
                if str(token_user_id) != str(request.user.pk):
                    raise TokenError("Invalid refresh token.")

                refresh_token.blacklist()
                log_audit_event(
                    user=request.user,
                    action=AuditLog.Action.LOGOUT,
                    resource=request.user,
                    old_values=None,
                    new_values=None,
                    request=request,
                )
        except TokenError:
            return Response(
                {"detail": "Invalid refresh token."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"message": "Logout successful."},
            status=status.HTTP_200_OK,
        )
