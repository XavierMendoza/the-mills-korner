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
