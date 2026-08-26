from django.urls import path

from .views import ImpactMetricListView, StaffImpactMetricViewSet

staff_impact_metric_list = StaffImpactMetricViewSet.as_view(
    {"get": "list", "post": "create"}
)
staff_impact_metric_detail = StaffImpactMetricViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    }
)

urlpatterns = [
    path("impact-metrics/", ImpactMetricListView.as_view(), name="impact-metric-list"),
]

staff_urlpatterns = [
    path(
        "impact-metrics/",
        staff_impact_metric_list,
        name="staff-impact-metric-list",
    ),
    path(
        "impact-metrics/<int:pk>/",
        staff_impact_metric_detail,
        name="staff-impact-metric-detail",
    ),
]
