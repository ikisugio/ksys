from rest_framework import status, generics
import re
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Company, Jigyosyo, JigyosyoTransaction, CustomUser
from .serializers import CompanySerializer, JigyosyoSerializer, JigyosyoTransactionSerializer, CustomUserSerializer, UserRegistrationSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.http import Http404
from django.db.models import Q
from django.contrib.auth.models import Group
from rest_framework.pagination import PageNumberPagination


class JigyosyoSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.query_params.get('q', None)

        if not query:
            return Response({"detail": "Query parameter q is required."}, status=status.HTTP_400_BAD_REQUEST)

        if request.user.groups.filter(name='本部').exists():
            search_criteria = (
                Q(name__icontains=query) |
                Q(type__icontains=query) |
                Q(company__name__icontains=query) |
                Q(transactions__content__icontains=query)  # ここを修正
            )
            jigyosyos = Jigyosyo.objects.filter(
                search_criteria).order_by('id').distinct()
        else:
            prefecture_name = request.user.groups.first().name
            search_criteria = (
                Q(name__icontains=query) |
                Q(type__icontains=query) |
                Q(company__name__icontains=query) |
                Q(transactions__content__icontains=query) &  # ここを修正
                Q(address__icontains=prefecture_name)
            )
            jigyosyos = Jigyosyo.objects.filter(
                search_criteria).order_by('id').distinct()

        paginator = PageNumberPagination()
        paginator.page_size = 50
        paginated_jigyosyos = paginator.paginate_queryset(jigyosyos, request)

        serializer = JigyosyoSerializer(paginated_jigyosyos, many=True)
        return Response(serializer.data)


class JigyosyoTransactionSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.query_params.get('q', None)

        if not query:
            return Response({"detail": "Query parameter q is required."}, status=status.HTTP_400_BAD_REQUEST)

        if request.user.groups.filter(name='本部').exists():
            search_criteria = (
                Q(content__icontains=query) |
                Q(jigyosyo__name__icontains=query) |
                Q(jigyosyo__type__icontains=query) |
                Q(jigyosyo__company__name__icontains=query)
            )
            transactions = JigyosyoTransaction.objects.filter(
                search_criteria).order_by('id').distinct()
        else:
            group = request.user.groups.first()
            if group is None:
                # Handle the case where the group is None, e.g., return an error response
                return Response({"detail": "User is not associated with any group."}, status=status.HTTP_400_BAD_REQUEST)
            prefecture_name = request.user.groups.first().name
            search_criteria = (
                Q(content__icontains=query) |
                Q(jigyosyo__name__icontains=query) |
                Q(jigyosyo__type__icontains=query) |
                Q(jigyosyo__company__name__icontains=query) &
                Q(jigyosyo__add_user__groups__name=prefecture_name)
            )
            transactions = JigyosyoTransaction.objects.filter(
                search_criteria).order_by('id').distinct()

        paginator = PageNumberPagination()
        paginator.page_size = 50
        paginated_transactions = paginator.paginate_queryset(
            transactions, request)

        serializer = JigyosyoTransactionSerializer(
            paginated_transactions, many=True)
        return paginator.get_paginated_response(serializer.data)


class CustomUserListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomUserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user = self.get_object(pk)
        if request.user != user and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = self.get_object(pk)
        if request.user != user and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = CustomUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = self.get_object(pk)
        if request.user != user and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserRegistrationSerializer


class CompanyListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_superuser:
            companies = Company.objects.all()
        else:
            companies = Company.objects.filter(add_user=request.user.username)
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(add_user=request.user.username)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CompanyDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Company.objects.get(pk=pk)
        except Company.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        company = self.get_object(pk)
        if request.user.username != company.add_user and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = CompanySerializer(company)
        return Response(serializer.data)

    def put(self, request, pk):
        company = self.get_object(pk)
        if request.user.username != company.add_user and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        company = self.get_object(pk)
        if request.user.username != company.add_user and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Jigyosyo Views
class JigyosyoListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_superuser:
            jigyosyos = Jigyosyo.objects.all()
        else:
            jigyosyos = Jigyosyo.objects.filter(add_user=request.user.username)
        serializer = JigyosyoSerializer(jigyosyos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = JigyosyoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(add_user=request.user.username)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JigyosyoDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Jigyosyo.objects.get(pk=pk)
        except Jigyosyo.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        jigyosyo = self.get_object(pk)
        if request.user.username != jigyosyo.add_user and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = JigyosyoSerializer(jigyosyo)
        return Response(serializer.data)

    def put(self, request, pk):
        jigyosyo = self.get_object(pk)
        if request.user.username != jigyosyo.add_user and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = JigyosyoSerializer(jigyosyo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        jigyosyo = self.get_object(pk)
        if request.user.username != jigyosyo.add_user and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        jigyosyo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# JigyosyoTransaction Views


class JigyosyoTransactionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_superuser:
            transactions = JigyosyoTransaction.objects.all()
        else:
            transactions = JigyosyoTransaction.objects.filter(
                jigyosyo__add_user=request.user.username)
        serializer = JigyosyoTransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = JigyosyoTransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JigyosyoTransactionDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return JigyosyoTransaction.objects.get(pk=pk)
        except JigyosyoTransaction.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        transaction = self.get_object(pk)
        if request.user.username != transaction.jigyosyo.add_user and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = JigyosyoTransactionSerializer(transaction)
        return Response(serializer.data)

    def put(self, request, pk):
        transaction = self.get_object(pk)
        if request.user.username != transaction.jigyosyo.add_user and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = JigyosyoTransactionSerializer(
            transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        transaction = self.get_object(pk)
        if request.user.username != transaction.jigyosyo.add_user and not request.user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
