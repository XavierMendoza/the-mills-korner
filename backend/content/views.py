from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny

from accounts.permissions import IsContentManagerOrSuperAdmin, IsInternalUser

from .models import OpportunityArea, Partner, Story
from .serializers import (
    OpportunityAreaSerializer,
    PartnerSerializer,
    StaffOpportunityAreaSerializer,
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


class StaffOpportunityAreaViewSet(viewsets.ModelViewSet):
    queryset = OpportunityArea.objects.all()
    serializer_class = StaffOpportunityAreaSerializer

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            permission_classes = (IsInternalUser,)
        else:
            permission_classes = (IsContentManagerOrSuperAdmin,)

        return [permission() for permission in permission_classes]
