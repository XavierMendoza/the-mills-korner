from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny

from accounts.permissions import IsContentManagerOrSuperAdmin, IsInternalUser

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


class StaffEventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = StaffEventSerializer

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            permission_classes = (IsInternalUser,)
        else:
            permission_classes = (IsContentManagerOrSuperAdmin,)

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(
            created_by=self.request.user,
            updated_by=self.request.user,
        )

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)
