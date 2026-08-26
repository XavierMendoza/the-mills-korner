from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny

from accounts.permissions import IsContentManagerOrSuperAdmin, IsInternalUser
from audit.mixins import AuditModelViewSetMixin

from .models import OpportunityArea, Partner, Story
from .serializers import (
    OpportunityAreaSerializer,
    PartnerSerializer,
    StaffOpportunityAreaSerializer,
    StaffPartnerSerializer,
    StaffStorySerializer,
    StorySerializer,
)


class OpportunityAreaListView(generics.ListAPIView):
    queryset = OpportunityArea.objects.filter(is_published=True)
    serializer_class = OpportunityAreaSerializer
    permission_classes = (AllowAny,)


class OpportunityAreaDetailView(generics.RetrieveAPIView):
    queryset = OpportunityArea.objects.filter(is_published=True)
    serializer_class = OpportunityAreaSerializer
    permission_classes = (AllowAny,)
    lookup_field = "slug"


class StoryListView(generics.ListAPIView):
    queryset = Story.objects.filter(is_published=True)
    serializer_class = StorySerializer
    permission_classes = (AllowAny,)


class StoryDetailView(generics.RetrieveAPIView):
    queryset = Story.objects.filter(is_published=True)
    serializer_class = StorySerializer
    permission_classes = (AllowAny,)
    lookup_field = "slug"


class PartnerListView(generics.ListAPIView):
    queryset = Partner.objects.filter(is_published=True)
    serializer_class = PartnerSerializer
    permission_classes = (AllowAny,)


class StaffOpportunityAreaViewSet(AuditModelViewSetMixin, viewsets.ModelViewSet):
    queryset = OpportunityArea.objects.all()
    serializer_class = StaffOpportunityAreaSerializer
    audit_fields = (
        "title",
        "slug",
        "short_description",
        "description",
        "display_order",
        "is_published",
    )

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            permission_classes = (IsInternalUser,)
        else:
            permission_classes = (IsContentManagerOrSuperAdmin,)

        return [permission() for permission in permission_classes]


class StaffStoryViewSet(AuditModelViewSetMixin, viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StaffStorySerializer
    audit_fields = (
        "title",
        "slug",
        "person_name",
        "summary",
        "before_story",
        "transformation_story",
        "current_story",
        "video_url",
        "is_featured",
        "is_published",
        "published_at",
        "created_by",
        "updated_by",
    )

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            permission_classes = (IsInternalUser,)
        else:
            permission_classes = (IsContentManagerOrSuperAdmin,)

        return [permission() for permission in permission_classes]

class StaffPartnerViewSet(AuditModelViewSetMixin, viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = StaffPartnerSerializer
    audit_fields = (
        "name",
        "partner_type",
        "website_url",
        "description",
        "display_order",
        "is_featured",
        "is_published",
    )

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            permission_classes = (IsInternalUser,)
        else:
            permission_classes = (IsContentManagerOrSuperAdmin,)

        return [permission() for permission in permission_classes]
