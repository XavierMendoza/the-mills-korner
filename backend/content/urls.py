from django.urls import path

from .views import (
    OpportunityAreaDetailView,
    OpportunityAreaListView,
    PartnerListView,
    StoryDetailView,
    StoryListView,
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
