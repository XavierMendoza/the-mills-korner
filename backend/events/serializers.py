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
