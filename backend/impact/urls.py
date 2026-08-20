from django.urls import path

from .views import ImpactMetricListView

urlpatterns = [
    path("impact-metrics/", ImpactMetricListView.as_view(), name="impact-metric-list"),
]
