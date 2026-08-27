from django.conf import settings
from django.db import models

from core.validators import validate_image_upload


class OpportunityArea(models.Model):
    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=170, unique=True)
    short_description = models.CharField(max_length=255)
    description = models.TextField()
    featured_image = models.ImageField(
        upload_to="opportunity_areas/",
        blank=True,
        validators=[validate_image_upload],
    )
    display_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "title"]

    def __str__(self):
        return self.title


class Story(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    person_name = models.CharField(max_length=150, blank=True)
    summary = models.CharField(max_length=300)
    before_story = models.TextField(blank=True)
    transformation_story = models.TextField()
    current_story = models.TextField(blank=True)
    featured_image = models.ImageField(
        upload_to="stories/",
        blank=True,
        validators=[validate_image_upload],
    )
    video_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="stories_created",
    )
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="stories_updated",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def __str__(self):
        return self.title


class Partner(models.Model):
    class PartnerType(models.TextChoices):
        SCHOOL = "SCHOOL", "School"
        FOUNDATION = "FOUNDATION", "Foundation"
        BUSINESS = "BUSINESS", "Business"
        CITY = "CITY", "City"
        FAITH = "FAITH", "Faith Community"
        OTHER = "OTHER", "Other"

    name = models.CharField(max_length=200)
    partner_type = models.CharField(max_length=10, choices=PartnerType.choices)
    logo = models.ImageField(
        upload_to="partners/",
        blank=True,
        validators=[validate_image_upload],
    )
    website_url = models.URLField(blank=True)
    description = models.TextField(blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "name"]

    def __str__(self):
        return self.name
