from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny

from accounts.permissions import IsContentManagerOrSuperAdmin, IsInternalUser
from audit.mixins import AuditModelViewSetMixin

from .models import Event
from .serializers import EventSerializer, StaffEventSerializer


class EventListView(generics.ListAPIView):
    queryset = Event.objects.filter(is_published=True)
    serializer_class = EventSerializer
    permission_classes = (AllowAny,)


class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.filter(is_published=True)
    serializer_class = EventSerializer
    permission_classes = (AllowAny,)
    lookup_field = "slug"


class StaffEventViewSet(AuditModelViewSetMixin, viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = StaffEventSerializer
    audit_fields = (
        "title",
        "slug",
        "summary",
        "description",
        "location_name",
        "address",
        "start_datetime",
        "end_datetime",
        "registration_url",
        "is_featured",
        "is_published",
        "created_by",
        "updated_by",
    )

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            permission_classes = (IsInternalUser,)
        else:
            permission_classes = (IsContentManagerOrSuperAdmin,)

        return [permission() for permission in permission_classes]
