from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from audit.models import AuditLog

from .models import User


class AuthenticationAPITests(APITestCase):
    def setUp(self):
        self.password = "Test-only-password-123!"
        self.user = User.objects.create_user(
            email="auth-user@example.com",
            password=self.password,
            first_name="Auth",
            last_name="User",
            role=User.Role.STAFF,
        )
        self.token_url = reverse("token-obtain-pair")
        self.me_url = reverse("current-user")

    def test_jwt_login_success_returns_tokens_and_logs_login(self):
        response = self.client.post(
            self.token_url,
            {"email": self.user.email, "password": self.password},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

        audit_log = AuditLog.objects.get(action=AuditLog.Action.LOGIN)
        self.assertEqual(audit_log.user, self.user)
        self.assertEqual(audit_log.resource_type, "User")
        self.assertEqual(audit_log.resource_id, str(self.user.pk))
        self.assertIsNone(audit_log.old_values)
        self.assertIsNone(audit_log.new_values)

    def test_jwt_login_failure_for_known_user_logs_failure(self):
        response = self.client.post(
            self.token_url,
            {"email": self.user.email, "password": "Incorrect-test-password"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        audit_logs = AuditLog.objects.filter(action=AuditLog.Action.LOGIN_FAILED)
        self.assertEqual(audit_logs.count(), 1)

        audit_log = audit_logs.get()
        self.assertIsNone(audit_log.user)
        self.assertEqual(audit_log.resource_type, "User")
        self.assertEqual(audit_log.resource_id, str(self.user.pk))
        self.assertEqual(audit_log.resource_name, self.user.email)
        self.assertIsNone(audit_log.old_values)
        self.assertIsNone(audit_log.new_values)

    def test_jwt_login_failure_for_unknown_user_does_not_store_email(self):
        unknown_email = "unknown-login@example.com"
        response = self.client.post(
            self.token_url,
            {"email": unknown_email, "password": "Incorrect-test-password"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        audit_logs = AuditLog.objects.filter(action=AuditLog.Action.LOGIN_FAILED)
        self.assertEqual(audit_logs.count(), 1)

        audit_log = audit_logs.get()
        self.assertIsNone(audit_log.user)
        self.assertEqual(audit_log.resource_type, "User")
        self.assertEqual(audit_log.resource_id, "")
        self.assertEqual(audit_log.resource_name, "Unknown user")
        self.assertNotIn(unknown_email, audit_log.resource_name)
        self.assertIsNone(audit_log.old_values)
        self.assertIsNone(audit_log.new_values)

    def test_current_user_requires_authentication(self):
        response = self.client.get(self.me_url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_current_user_returns_only_safe_fields(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.get(self.me_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            set(response.data),
            {"id", "email", "first_name", "last_name", "role", "is_staff"},
        )
        self.assertEqual(response.data["id"], self.user.pk)
        self.assertEqual(response.data["email"], self.user.email)
        self.assertNotIn("password", response.data)
        self.assertNotIn("is_superuser", response.data)
