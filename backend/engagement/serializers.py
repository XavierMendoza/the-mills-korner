from rest_framework import serializers

from .models import Inquiry, NewsletterSubscriber


class InquiryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = (
            "inquiry_type",
            "first_name",
            "last_name",
            "email",
            "phone",
            "organization",
            "message",
        )

    def validate_email(self, value):
        return value.strip().lower()


class NewsletterSubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ("email",)

    def validate_email(self, value):
        return value.strip().lower()
