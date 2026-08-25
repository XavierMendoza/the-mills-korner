from django.urls import path

from .views import EventDetailView, EventListView, StaffEventViewSet

staff_event_list = StaffEventViewSet.as_view({"get": "list", "post": "create"})
staff_event_detail = StaffEventViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    }
)

urlpatterns = [
    path("events/", EventListView.as_view(), name="event-list"),
    path("events/<slug:slug>/", EventDetailView.as_view(), name="event-detail"),
]

staff_urlpatterns = [
    path("events/", staff_event_list, name="staff-event-list"),
    path("events/<int:pk>/", staff_event_detail, name="staff-event-detail"),
]
