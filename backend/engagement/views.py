from django.db import transaction
from django.utils import timezone
from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from accounts.permissions import IsInternalUser, IsStaffUser
from audit.models import AuditLog
from audit.services import log_audit_event, model_to_audit_dict

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
    throttle_classes = (ScopedRateThrottle,)
    throttle_scope = "public_inquiry"


class NewsletterSubscribeView(APIView):
    permission_classes = (AllowAny,)
    throttle_classes = (ScopedRateThrottle,)
    throttle_scope = "public_newsletter"

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

    def perform_update(self, serializer):
        audit_fields = ("status", "assigned_to")
        with transaction.atomic():
            old_values = model_to_audit_dict(serializer.instance, audit_fields)
            updated_inquiry = serializer.save()
            new_values = model_to_audit_dict(updated_inquiry, audit_fields)

            log_audit_event(
                user=self.request.user,
                action=AuditLog.Action.UPDATE,
                resource=updated_inquiry,
                old_values=old_values,
                new_values=new_values,
                request=self.request,
            )


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
        audit_fields = ("is_active", "unsubscribed_at")
        with transaction.atomic():
            old_values = model_to_audit_dict(serializer.instance, audit_fields)

            is_active = serializer.validated_data.get("is_active")
            active_state_changed = (
                is_active is not None and is_active != serializer.instance.is_active
            )

            if active_state_changed:
                unsubscribed_at = None if is_active else timezone.now()
                updated_subscriber = serializer.save(unsubscribed_at=unsubscribed_at)
            else:
                updated_subscriber = serializer.save()

            new_values = model_to_audit_dict(updated_subscriber, audit_fields)
            log_audit_event(
                user=self.request.user,
                action=AuditLog.Action.UPDATE,
                resource=updated_subscriber,
                old_values=old_values,
                new_values=new_values,
                request=self.request,
            )
