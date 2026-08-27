from io import BytesIO
from tempfile import TemporaryDirectory

from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from django.urls import reverse
from PIL import Image
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from core.validators import MAX_IMAGE_UPLOAD_SIZE, validate_image_upload
from events.models import Event
from events.serializers import StaffEventSerializer

from .models import OpportunityArea, Partner, Story
from .serializers import (
    StaffOpportunityAreaSerializer,
    StaffPartnerSerializer,
    StaffStorySerializer,
)


class StaffImageUploadValidationTests(APITestCase):
    def setUp(self):
        self.media_directory = TemporaryDirectory()
        self.media_override = override_settings(MEDIA_ROOT=self.media_directory.name)
        self.media_override.enable()
        self.user = User.objects.create_user(
            email="media-manager@example.com",
            password="Test-only-password-123!",
            role=User.Role.CONTENT_MANAGER,
        )
        self.client.force_authenticate(user=self.user)
        self.url = reverse("staff-opportunity-area-list")

    def tearDown(self):
        self.media_override.disable()
        self.media_directory.cleanup()
        super().tearDown()

    @staticmethod
    def image_upload(image_format, filename):
        image_bytes = BytesIO()
        Image.new("RGB", (8, 8), color="navy").save(
            image_bytes,
            format=image_format,
        )
        return SimpleUploadedFile(
            filename,
            image_bytes.getvalue(),
            content_type=f"image/{image_format.lower()}",
        )

    def post_opportunity_area(self, image):
        return self.client.post(
            self.url,
            {
                "title": "Safe image upload",
                "slug": f"safe-image-{OpportunityArea.objects.count()}",
                "short_description": "Image validation test",
                "description": "Validates uploaded image content.",
                "featured_image": image,
            },
            format="multipart",
        )

    def test_valid_jpeg_is_accepted(self):
        response = self.post_opportunity_area(
            self.image_upload("JPEG", "accepted.jpg")
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_valid_png_is_accepted(self):
        response = self.post_opportunity_area(
            self.image_upload("PNG", "accepted.png")
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_valid_webp_is_accepted(self):
        response = self.post_opportunity_area(
            self.image_upload("WEBP", "accepted.webp")
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_oversized_image_is_rejected(self):
        upload = self.image_upload("PNG", "oversized.png")
        upload = SimpleUploadedFile(
            upload.name,
            upload.read() + (b"0" * MAX_IMAGE_UPLOAD_SIZE),
            content_type="image/png",
        )

        response = self.post_opportunity_area(upload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(
            "Image file must be 5 MB or smaller.",
            response.data["featured_image"],
        )

    def test_unsupported_image_format_is_rejected(self):
        response = self.post_opportunity_area(
            self.image_upload("GIF", "unsupported.gif")
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(
            "Unsupported image format. Use JPEG, PNG, or WEBP.",
            response.data["featured_image"],
        )

    def test_fake_image_content_is_rejected(self):
        upload = SimpleUploadedFile(
            "fake.jpg",
            b"This is not image data.",
            content_type="image/jpeg",
        )
        response = self.post_opportunity_area(upload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("featured_image", response.data)

    def test_shared_validator_rejects_fake_content_and_resets_file_pointer(self):
        upload = SimpleUploadedFile(
            "fake.jpg",
            b"This is not image data.",
            content_type="image/jpeg",
        )

        with self.assertRaisesMessage(
            ValidationError,
            "Uploaded file is not a valid image.",
        ):
            validate_image_upload(upload)

        self.assertEqual(upload.tell(), 0)

    def test_all_staff_serializer_image_fields_use_shared_validator(self):
        serializer_fields = (
            StaffOpportunityAreaSerializer().fields["featured_image"],
            StaffStorySerializer().fields["featured_image"],
            StaffPartnerSerializer().fields["logo"],
            StaffEventSerializer().fields["featured_image"],
        )
        model_fields = (
            OpportunityArea._meta.get_field("featured_image"),
            Story._meta.get_field("featured_image"),
            Partner._meta.get_field("logo"),
            Event._meta.get_field("featured_image"),
        )

        for serializer_field in serializer_fields:
            self.assertIn(validate_image_upload, serializer_field.validators)
        for model_field in model_fields:
            self.assertIn(validate_image_upload, model_field.validators)
