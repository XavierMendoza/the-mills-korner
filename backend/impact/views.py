from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny

from accounts.permissions import IsContentManagerOrSuperAdmin, IsInternalUser
from audit.mixins import AuditModelViewSetMixin

from .models import ImpactMetric
from .serializers import ImpactMetricSerializer, StaffImpactMetricSerializer


class ImpactMetricListView(generics.ListAPIView):
    queryset = ImpactMetric.objects.filter(is_published=True)
    serializer_class = ImpactMetricSerializer
    permission_classes = (AllowAny,)


class StaffImpactMetricViewSet(AuditModelViewSetMixin, viewsets.ModelViewSet):
    queryset = ImpactMetric.objects.all()
    serializer_class = StaffImpactMetricSerializer
    audit_fields = (
        "name",
        "value",
        "prefix",
        "suffix",
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
