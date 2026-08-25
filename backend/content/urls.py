from django.urls import path

from .views import (
    OpportunityAreaDetailView,
    OpportunityAreaListView,
    PartnerListView,
    StaffOpportunityAreaViewSet,
    StaffStoryViewSet,
    StoryDetailView,
    StoryListView,
)

staff_opportunity_area_list = StaffOpportunityAreaViewSet.as_view(
    {"get": "list", "post": "create"}
)
staff_opportunity_area_detail = StaffOpportunityAreaViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    }
)
staff_story_list = StaffStoryViewSet.as_view({"get": "list", "post": "create"})
staff_story_detail = StaffStoryViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    }
)

urlpatterns = [
    path("opportunity-areas/", OpportunityAreaListView.as_view(), name="opportunity-area-list"),
    path(
        "opportunity-areas/<slug:slug>/",
        OpportunityAreaDetailView.as_view(),
        name="opportunity-area-detail",
    ),
    path("stories/", StoryListView.as_view(), name="story-list"),
    path("stories/<slug:slug>/", StoryDetailView.as_view(), name="story-detail"),
    path("partners/", PartnerListView.as_view(), name="partner-list"),
]

staff_urlpatterns = [
    path(
        "opportunity-areas/",
        staff_opportunity_area_list,
        name="staff-opportunity-area-list",
    ),
    path(
        "opportunity-areas/<int:pk>/",
        staff_opportunity_area_detail,
        name="staff-opportunity-area-detail",
    ),
    path("stories/", staff_story_list, name="staff-story-list"),
    path("stories/<int:pk>/", staff_story_detail, name="staff-story-detail"),
]
