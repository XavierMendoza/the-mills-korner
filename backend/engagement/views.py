from django.utils import timezone
from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.permissions import IsInternalUser, IsStaffUser

from .models import Inquiry, NewsletterSubscriber
from .serializers import (
    InquiryCreateSerializer,
    NewsletterSubscribeSerializer,
    StaffInquirySerializer,
    StaffNewsletterSubscriberSerializer,
)


class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquiryCreateSerializer
    permission_classes = (AllowAny,)


class NewsletterSubscribeView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = NewsletterSubscribeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        subscriber, created = NewsletterSubscriber.objects.get_or_create(email=email)

        if created:
            return Response(
                {"message": "Subscription created."},
                status=status.HTTP_201_CREATED,
            )

        if subscriber.is_active:
            return Response(
                {"message": "Already subscribed."},
                status=status.HTTP_200_OK,
            )

        subscriber.is_active = True
        subscriber.unsubscribed_at = None
        subscriber.save(update_fields=("is_active", "unsubscribed_at"))
        return Response(
            {"message": "Subscription reactivated."},
            status=status.HTTP_200_OK,
        )


class StaffInquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all()
    serializer_class = StaffInquirySerializer
    http_method_names = ("get", "put", "patch", "head", "options")

    def get_permissions(self):
        if self.action in ("update", "partial_update"):
            permission_classes = (IsStaffUser,)
        else:
            permission_classes = (IsInternalUser,)

        return [permission() for permission in permission_classes]


class StaffNewsletterSubscriberViewSet(viewsets.ModelViewSet):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = StaffNewsletterSubscriberSerializer
    http_method_names = ("get", "put", "patch", "head", "options")

    def get_permissions(self):
        if self.action in ("update", "partial_update"):
            permission_classes = (IsStaffUser,)
        else:
            permission_classes = (IsInternalUser,)

        return [permission() for permission in permission_classes]

    def perform_update(self, serializer):
        if "is_active" not in serializer.validated_data:
            serializer.save()
            return

        is_active = serializer.validated_data["is_active"]
        if is_active == serializer.instance.is_active:
            serializer.save()
            return

        unsubscribed_at = None if is_active else timezone.now()
        serializer.save(unsubscribed_at=unsubscribed_at)
