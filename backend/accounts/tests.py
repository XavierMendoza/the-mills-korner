from django.core.cache import cache
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from audit.models import AuditLog

from .models import User


class AuthenticationAPITests(APITestCase):
    def setUp(self):
        cache.clear()
        self.password = "Test-only-password-123!"
        self.user = User.objects.create_user(
            email="auth-user@example.com",
            password=self.password,
            first_name="Auth",
            last_name="User",
            role=User.Role.STAFF,
        )
        self.token_url = reverse("token-obtain-pair")
        self.token_refresh_url = reverse("token-refresh")
        self.logout_url = reverse("logout")
        self.me_url = reverse("current-user")

    def tearDown(self):
        cache.clear()
        super().tearDown()

    def login(self, user, password):
        response = self.client.post(
            self.token_url,
            {"email": user.email, "password": password},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return response.data

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

    def test_refresh_rotation_invalidates_old_token_and_keeps_new_token_usable(self):
        login_data = self.login(self.user, self.password)
        refresh_token_a = login_data["refresh"]

        rotate_response = self.client.post(
            self.token_refresh_url,
            {"refresh": refresh_token_a},
            format="json",
        )

        self.assertEqual(rotate_response.status_code, status.HTTP_200_OK)
        self.assertIn("access", rotate_response.data)
        self.assertIn("refresh", rotate_response.data)
        refresh_token_b = rotate_response.data["refresh"]

        reuse_response = self.client.post(
            self.token_refresh_url,
            {"refresh": refresh_token_a},
            format="json",
        )
        self.assertEqual(reuse_response.status_code, status.HTTP_401_UNAUTHORIZED)

        new_token_response = self.client.post(
            self.token_refresh_url,
            {"refresh": refresh_token_b},
            format="json",
        )
        self.assertEqual(new_token_response.status_code, status.HTTP_200_OK)

    def test_logout_blacklists_refresh_token_and_logs_logout(self):
        login_data = self.login(self.user, self.password)
        access_token = login_data["access"]
        refresh_token = login_data["refresh"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        logout_response = self.client.post(
            self.logout_url,
            {"refresh": refresh_token},
            format="json",
        )

        self.assertEqual(logout_response.status_code, status.HTTP_200_OK)
        reuse_response = self.client.post(
            self.token_refresh_url,
            {"refresh": refresh_token},
            format="json",
        )
        self.assertEqual(reuse_response.status_code, status.HTTP_401_UNAUTHORIZED)

        logout_logs = AuditLog.objects.filter(
            action=AuditLog.Action.LOGOUT,
            user=self.user,
        )
        self.assertEqual(logout_logs.count(), 1)
        logout_log = logout_logs.get()
        self.assertIsNone(logout_log.old_values)
        self.assertIsNone(logout_log.new_values)

    def test_user_cannot_logout_another_users_refresh_token(self):
        second_password = "Second-user-test-password-123!"
        second_user = User.objects.create_user(
            email="second-auth-user@example.com",
            password=second_password,
            role=User.Role.STAFF,
        )
        first_login = self.login(self.user, self.password)
        second_login = self.login(second_user, second_password)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {first_login['access']}"
        )

        logout_response = self.client.post(
            self.logout_url,
            {"refresh": second_login["refresh"]},
            format="json",
        )

        self.assertEqual(logout_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(
            AuditLog.objects.filter(action=AuditLog.Action.LOGOUT).exists()
        )

        refresh_response = self.client.post(
            self.token_refresh_url,
            {"refresh": second_login["refresh"]},
            format="json",
        )
        self.assertEqual(refresh_response.status_code, status.HTTP_200_OK)


class LoginThrottleAPITests(APITestCase):
    client_ip = "198.51.100.25"

    def setUp(self):
        cache.clear()
        self.password = "Throttle-test-password-123!"
        self.user = User.objects.create_user(
            email="throttle-user@example.com",
            password=self.password,
            role=User.Role.STAFF,
        )
        self.token_url = reverse("token-obtain-pair")

    def tearDown(self):
        cache.clear()
        super().tearDown()

    def failed_login(self):
        return self.client.post(
            self.token_url,
            {"email": self.user.email, "password": "Incorrect-test-password"},
            format="json",
            REMOTE_ADDR=self.client_ip,
        )

    def test_repeated_failed_login_is_throttled_after_five_attempts(self):
        first_five_responses = [self.failed_login() for _ in range(5)]
        sixth_response = self.failed_login()

        self.assertEqual(
            [response.status_code for response in first_five_responses],
            [status.HTTP_401_UNAUTHORIZED] * 5,
        )
        self.assertEqual(
            sixth_response.status_code,
            status.HTTP_429_TOO_MANY_REQUESTS,
        )
        self.assertEqual(
            AuditLog.objects.filter(action=AuditLog.Action.LOGIN_FAILED).count(),
            5,
        )

    def test_correct_login_is_throttled_after_failed_attempts_exhaust_limit(self):
        failed_responses = [self.failed_login() for _ in range(5)]
        correct_response = self.client.post(
            self.token_url,
            {"email": self.user.email, "password": self.password},
            format="json",
            REMOTE_ADDR=self.client_ip,
        )

        self.assertEqual(
            [response.status_code for response in failed_responses],
            [status.HTTP_401_UNAUTHORIZED] * 5,
        )
        self.assertEqual(
            correct_response.status_code,
            status.HTTP_429_TOO_MANY_REQUESTS,
        )
        self.assertEqual(
            AuditLog.objects.filter(action=AuditLog.Action.LOGIN_FAILED).count(),
            5,
        )
        self.assertFalse(AuditLog.objects.filter(action=AuditLog.Action.LOGIN).exists())

    def test_login_throttle_cache_starts_empty(self):
        response = self.client.post(
            self.token_url,
            {"email": self.user.email, "password": self.password},
            format="json",
            REMOTE_ADDR=self.client_ip,
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
