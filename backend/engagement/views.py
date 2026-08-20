from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Inquiry, NewsletterSubscriber
from .serializers import InquiryCreateSerializer, NewsletterSubscribeSerializer


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
