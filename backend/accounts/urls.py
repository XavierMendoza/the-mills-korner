from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import AuditedTokenObtainPairView, CurrentUserView, LogoutView

urlpatterns = [
    path("token/", AuditedTokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", CurrentUserView.as_view(), name="current-user"),
]
