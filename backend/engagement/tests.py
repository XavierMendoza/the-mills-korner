from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from audit.models import AuditLog

from .models import Inquiry, NewsletterSubscriber


class StaffEngagementAPITests(APITestCase):
    def setUp(self):
        self.viewer = User.objects.create_user(
            email="viewer@example.com",
            password="Viewer-test-password-123!",
            role=User.Role.VIEWER,
        )
        self.staff_user = User.objects.create_user(
            email="staff@example.com",
            password="Staff-test-password-123!",
            role=User.Role.STAFF,
        )
        self.inquiry = Inquiry.objects.create(
            inquiry_type=Inquiry.InquiryType.CONTACT,
            first_name="Taylor",
            last_name="Example",
            email="inquiry@example.com",
            message="Original inquiry message.",
        )
        self.subscriber = NewsletterSubscriber.objects.create(
            email="subscriber@example.com"
        )
        self.inquiry_list_url = reverse("staff-inquiry-list")
        self.inquiry_detail_url = reverse(
            "staff-inquiry-detail",
            args=[self.inquiry.pk],
        )
        self.subscriber_list_url = reverse("staff-newsletter-subscriber-list")
        self.subscriber_detail_url = reverse(
            "staff-newsletter-subscriber-detail",
            args=[self.subscriber.pk],
        )

    def test_public_inquiry_cannot_set_protected_fields(self):
        response = self.client.post(
            reverse("inquiry-create"),
            {
                "inquiry_type": Inquiry.InquiryType.VOLUNTEER,
                "first_name": "Public",
                "last_name": "Submitter",
                "email": "public-inquiry@example.com",
                "phone": "555-0100",
                "organization": "Example Organization",
                "message": "I would like to volunteer.",
                "status": Inquiry.Status.CLOSED,
                "assigned_to": self.staff_user.pk,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        inquiry = Inquiry.objects.get(email="public-inquiry@example.com")
        self.assertEqual(inquiry.status, Inquiry.Status.NEW)
        self.assertIsNone(inquiry.assigned_to)

    def test_viewer_can_read_but_cannot_update_inquiry(self):
        self.client.force_authenticate(user=self.viewer)

        list_response = self.client.get(self.inquiry_list_url)
        update_response = self.client.patch(
            self.inquiry_detail_url,
            {"status": Inquiry.Status.CONTACTED},
            format="json",
        )

        self.assertEqual(list_response.status_code, status.HTTP_200_OK)
        self.assertEqual(update_response.status_code, status.HTTP_403_FORBIDDEN)

    def test_staff_can_update_inquiry_status(self):
        self.client.force_authenticate(user=self.staff_user)

        response = self.client.patch(
            self.inquiry_detail_url,
            {"status": Inquiry.Status.CONTACTED},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.inquiry.refresh_from_db()
        self.assertEqual(self.inquiry.status, Inquiry.Status.CONTACTED)

    def test_staff_cannot_change_original_inquiry_fields(self):
        self.client.force_authenticate(user=self.staff_user)
        original_email = self.inquiry.email
        original_message = self.inquiry.message

        response = self.client.patch(
            self.inquiry_detail_url,
            {
                "status": Inquiry.Status.IN_REVIEW,
                "email": "changed@example.com",
                "message": "Changed message.",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.inquiry.refresh_from_db()
        self.assertEqual(self.inquiry.status, Inquiry.Status.IN_REVIEW)
        self.assertEqual(self.inquiry.email, original_email)
        self.assertEqual(self.inquiry.message, original_message)

    def test_staff_inquiry_create_and_delete_are_not_supported(self):
        self.client.force_authenticate(user=self.staff_user)

        create_response = self.client.post(self.inquiry_list_url, {}, format="json")
        delete_response = self.client.delete(self.inquiry_detail_url)

        self.assertEqual(
            create_response.status_code,
            status.HTTP_405_METHOD_NOT_ALLOWED,
        )
        self.assertEqual(
            delete_response.status_code,
            status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    def test_inquiry_update_creates_limited_audit_snapshot(self):
        self.client.force_authenticate(user=self.staff_user)

        response = self.client.patch(
            self.inquiry_detail_url,
            {"status": Inquiry.Status.CONTACTED},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        audit_logs = AuditLog.objects.filter(
            action=AuditLog.Action.UPDATE,
            resource_type="Inquiry",
            resource_id=str(self.inquiry.pk),
        )
        self.assertEqual(audit_logs.count(), 1)

        audit_log = audit_logs.get()
        self.assertEqual(set(audit_log.old_values), {"status", "assigned_to"})
        self.assertEqual(set(audit_log.new_values), {"status", "assigned_to"})
        self.assertEqual(audit_log.old_values["status"], Inquiry.Status.NEW)
        self.assertEqual(
            audit_log.new_values["status"],
            Inquiry.Status.CONTACTED,
        )

    def test_newsletter_active_state_controls_unsubscribed_timestamp(self):
        self.client.force_authenticate(user=self.staff_user)

        deactivate_response = self.client.patch(
            self.subscriber_detail_url,
            {"is_active": False},
            format="json",
        )
        self.assertEqual(deactivate_response.status_code, status.HTTP_200_OK)
        self.subscriber.refresh_from_db()
        self.assertFalse(self.subscriber.is_active)
        self.assertIsNotNone(self.subscriber.unsubscribed_at)

        reactivate_response = self.client.patch(
            self.subscriber_detail_url,
            {"is_active": True},
            format="json",
        )
        self.assertEqual(reactivate_response.status_code, status.HTTP_200_OK)
        self.subscriber.refresh_from_db()
        self.assertTrue(self.subscriber.is_active)
        self.assertIsNone(self.subscriber.unsubscribed_at)

    def test_staff_newsletter_create_and_delete_are_not_supported(self):
        self.client.force_authenticate(user=self.staff_user)

        create_response = self.client.post(self.subscriber_list_url, {}, format="json")
        delete_response = self.client.delete(self.subscriber_detail_url)

        self.assertEqual(
            create_response.status_code,
            status.HTTP_405_METHOD_NOT_ALLOWED,
        )
        self.assertEqual(
            delete_response.status_code,
            status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    def test_newsletter_update_creates_limited_audit_snapshot(self):
        self.client.force_authenticate(user=self.staff_user)

        response = self.client.patch(
            self.subscriber_detail_url,
            {"is_active": False},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        audit_logs = AuditLog.objects.filter(
            action=AuditLog.Action.UPDATE,
            resource_type="NewsletterSubscriber",
            resource_id=str(self.subscriber.pk),
        )
        self.assertEqual(audit_logs.count(), 1)

        audit_log = audit_logs.get()
        expected_fields = {"is_active", "unsubscribed_at"}
        self.assertEqual(set(audit_log.old_values), expected_fields)
        self.assertEqual(set(audit_log.new_values), expected_fields)
