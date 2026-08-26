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
        extra_kwargs = {"email": {"validators": []}}

    def validate_email(self, value):
        return value.strip().lower()


class StaffInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = (
            "id",
            "inquiry_type",
            "first_name",
            "last_name",
            "email",
            "phone",
            "organization",
            "message",
            "status",
            "assigned_to",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "inquiry_type",
            "first_name",
            "last_name",
            "email",
            "phone",
            "organization",
            "message",
            "created_at",
            "updated_at",
        )


class StaffNewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = (
            "id",
            "email",
            "is_active",
            "subscribed_at",
            "unsubscribed_at",
        )
        read_only_fields = (
            "id",
            "email",
            "subscribed_at",
            "unsubscribed_at",
        )
