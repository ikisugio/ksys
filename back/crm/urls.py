from django.urls import path
from .views import (
    JigyosyoSearchView,
    JigyosyoListView,
    JigyosyoDetailView,
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
    path("search/jigyosyo/", JigyosyoSearchView.as_view(), name='jigyosyo-search'),
    path("search/jigyosyo-transaction/", JigyosyoTransactionSearchView.as_view(),
         name='jigyosyo-transaction-search'),
    path("jigyosyos/", JigyosyoListView.as_view(), name='jigyosyo-list'),
    path("jigyosyos/<int:pk>/", JigyosyoDetailView.as_view(), name='jigyosyo-detail'),
    path("jigyosyo-transactions/", JigyosyoTransactionListView.as_view(),
         name='jigyosyo-transaction-list'),
    path("jigyosyo-transactions/<int:pk>/",
         JigyosyoTransactionDetailView.as_view(), name='jigyosyo-transaction-detail'),
    path("register/", UserRegistrationView.as_view(), name="user-register"),
    path("users/", CustomUserListView.as_view(), name="user-list"),
    path("users/<int:pk>/", CustomUserDetailView.as_view(), name="user-detail"),
    path("companies/", CompanyListView.as_view(), name="company-list"),
    path("companies/<int:pk>/", CompanyDetailView.as_view(), name="company-detail"),
    path('token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
