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


class StaffOpportunityAreaSerializer(serializers.ModelSerializer):
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
            "is_published",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")


class StaffStorySerializer(serializers.ModelSerializer):
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
            "is_featured",
            "is_published",
            "published_at",
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
