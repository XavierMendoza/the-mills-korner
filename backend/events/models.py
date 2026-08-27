from django.conf import settings
from django.db import models

from core.validators import validate_image_upload


class Event(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    summary = models.CharField(max_length=300)
    description = models.TextField()
    location_name = models.CharField(max_length=200, blank=True)
    address = models.CharField(max_length=300, blank=True)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    featured_image = models.ImageField(
        upload_to="events/",
        blank=True,
        validators=[validate_image_upload],
    )
    registration_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="events_created",
    )
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="events_updated",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["start_datetime", "title"]

    def __str__(self):
        return self.title
