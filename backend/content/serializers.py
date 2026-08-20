from rest_framework import serializers

from .models import OpportunityArea, Partner, Story


class OpportunityAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpportunityArea
        fields = (
            "id",
            "title",
            "slug",
            "short_description",
            "description",
            "featured_image",
            "display_order",
        )


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = (
            "id",
            "title",
            "slug",
            "person_name",
            "summary",
            "before_story",
            "transformation_story",
            "current_story",
            "featured_image",
            "video_url",
            "published_at",
        )


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = (
            "id",
            "name",
            "partner_type",
            "logo",
            "website_url",
            "description",
            "display_order",
        )
