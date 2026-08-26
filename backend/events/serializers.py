from rest_framework import serializers

from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            "id",
            "title",
            "slug",
            "summary",
            "description",
            "location_name",
            "address",
            "start_datetime",
            "end_datetime",
            "featured_image",
            "registration_url",
        )


class StaffEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            "id",
            "title",
            "slug",
            "summary",
            "description",
            "location_name",
            "address",
            "start_datetime",
            "end_datetime",
            "featured_image",
            "registration_url",
            "is_featured",
            "is_published",
            "created_by",
            "updated_by",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "created_by",
            "updated_by",
            "created_at",
            "updated_at",
        )
