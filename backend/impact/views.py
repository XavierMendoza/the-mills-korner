from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import ImpactMetric
from .serializers import ImpactMetricSerializer


class ImpactMetricListView(generics.ListAPIView):
    queryset = ImpactMetric.objects.filter(is_published=True)
    serializer_class = ImpactMetricSerializer
    permission_classes = (AllowAny,)
