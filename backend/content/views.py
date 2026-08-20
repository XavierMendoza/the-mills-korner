from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import OpportunityArea, Partner, Story
from .serializers import OpportunityAreaSerializer, PartnerSerializer, StorySerializer


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
