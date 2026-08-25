from rest_framework import serializers

from .models import ImpactMetric


class ImpactMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImpactMetric
        fields = (
            "id",
            "name",
            "value",
            "prefix",
            "suffix",
            "description",
            "display_order",
        )


class StaffImpactMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImpactMetric
        fields = (
            "id",
            "name",
            "value",
            "prefix",
            "suffix",
            "description",
            "display_order",
            "is_featured",
            "is_published",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")
