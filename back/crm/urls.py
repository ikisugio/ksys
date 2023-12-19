from django.urls import path
from .views import (
    JigyosyoManagementSearchView,
    JigyosyoListView,
    JigyosyoDetailView,
    JigyosyoManagementListView,
    JigyosyoManagementDetailView,
    JigyosyoTransactionSearchView,
    JigyosyoTransactionListView,
    JigyosyoTransactionDetailView,
    UserRegistrationView,
    CustomUserListView,
    CustomUserDetailView,
    CompanyListView,
    CompanyDetailView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path(
        "search/jigyosyo/",
        JigyosyoManagementSearchView.as_view(),
        name="jigyosyo-search",
    ),
    path(
        "search/jigyosyo-transaction/",
        JigyosyoTransactionSearchView.as_view(),
        name="jigyosyo-transaction-search",
    ),
    path("jigyosyo/", JigyosyoListView.as_view(), name="jigyosyo-list"),
    path("jigyosyo/<int:pk>/", JigyosyoDetailView.as_view(), name="jigyosyo-detail"),
    path("jigyosyo-management/", JigyosyoManagementListView.as_view()),
    path("jigyosyo-management/<int:pk>/", JigyosyoManagementDetailView.as_view()),
    path(
        "jigyosyo-transaction/",
        JigyosyoTransactionListView.as_view(),
        name="jigyosyo-transaction-list",
    ),
    path(
        "jigyosyo-transaction/<int:pk>/",
        JigyosyoTransactionDetailView.as_view(),
        name="jigyosyo-transaction-detail",
    ),
    path("register/", UserRegistrationView.as_view(), name="user-register"),
    path("user/", CustomUserListView.as_view(), name="user-list"),
    path("user/<int:pk>/", CustomUserDetailView.as_view(), name="user-detail"),
    path("company/", CompanyListView.as_view(), name="company-list"),
    path("company/<int:pk>/", CompanyDetailView.as_view(), name="company-detail"),
    path("token/", TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
]
