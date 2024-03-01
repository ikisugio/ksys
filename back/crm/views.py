from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from crm.models import (
    Company,
    Jigyosyo,
    JigyosyoManagement,
    JigyosyoTransaction,
    CustomUser,
)
from crm.serializers import (
    CompanySerializer,
    JigyosyoSerializer,
    JigyosyoMergeSerializer,
    JigyosyoSplitSerializer,
    JigyosyoManagementSerializer,
    JigyosyoTransactionSerializer,
    CustomUserSerializer,
    UserRegistrationSerializer,
)
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.http import Http404
from django.db.models import Q
from django.contrib.auth.models import Group
from drf_yasg.utils import swagger_auto_schema


class JigyosyoManagementSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.query_params.get("q", None)
        if not query:
            return Response(
                {"detail": "Query parameter q is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        common_search_criteria = (
            Q(name__icontains=query)
            | Q(jigyosyo_code__contains=query)
            | Q(address__contains=query)
            | Q(company__name__contains=query)
            | Q(tel_number__contains=query)
        )

        if request.user.groups.filter(name="本部").exists():
            search_criteria = common_search_criteria
        else:
            prefecture_name = request.user.groups.first().name
            search_criteria = common_search_criteria & Q(
                address__icontains=prefecture_name
            )

        jigyosyos = (
            Jigyosyo.objects.filter(search_criteria)
            .prefetch_related("management")
            .distinct()
        )

        serializer = JigyosyoSerializer(jigyosyos, many=True)
        return Response(serializer.data)


class JigyosyoTransactionSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.query_params.get("q", None)
        jigyosyo_code = request.query_params.get("_jigyosyo_code", None)
        jigyosyo_custom_code = request.query_params.get("_jigyosyo_custom_code", None)

        if not any([query, jigyosyo_code, jigyosyo_custom_code]):
            return Response(
                {
                    "detail": "At least one query parameter (q, _jigyosyo_code, _jigyosyo_custom_code) is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        search_criteria = Q()

        if query:
            search_criteria |= (
                Q(jigyosyo__name__icontains=query)
                | Q(jigyosyo__type__icontains=query)
                | Q(jigyosyo__company__name__icontains=query)
            )

        if jigyosyo_code:
            search_criteria &= Q(_jigyosyo_code=jigyosyo_code)

        if jigyosyo_custom_code:
            search_criteria &= Q(_jigyosyo_custom_code=jigyosyo_custom_code)

        if request.user.groups.filter(name="本部").exists():
            transactions = (
                JigyosyoTransaction.objects.filter(search_criteria)
                .distinct()
                .order_by("-id")
            )
        else:
            group = request.user.groups.first()
            if group is None:
                return Response(
                    {"detail": "User is not associated with any group."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            prefecture_name = group.name
            search_criteria &= Q(jigyosyo__update_user__groups__name=prefecture_name)
            transactions = (
                JigyosyoTransaction.objects.filter(search_criteria)
                .distinct()
                .order_by("-id")
            )

        serializer = JigyosyoTransactionSerializer(transactions, many=True)
        return Response(serializer.data)


class CustomUserListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=CustomUserSerializer)
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
            companies = Company.objects.filter(update_user=request.user.username)
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=CompanySerializer)
    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(update_user=request.user.username)
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
        if (
            request.user.username != company.update_user
            and not request.user.is_superuser
        ):
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = CompanySerializer(company)
        return Response(serializer.data)

    def put(self, request, pk):
        company = self.get_object(pk)
        if (
            request.user.username != company.update_user
            and not request.user.is_superuser
        ):
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        company = self.get_object(pk)
        if (
            request.user.username != company.update_user
            and not request.user.is_superuser
        ):
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
            jigyosyos = Jigyosyo.objects.filter(update_user=request.user.username)
        serializer = JigyosyoSerializer(jigyosyos, many=True)
        return Response(serializer.data)

    # def get(self, request):
    #     if request.user.is_superuser:
    #         jigyosyos = Jigyosyo.objects.filter(
    #             merged_into__isnull=True, split_into__isnull=True
    #         )
    #     else:
    #         jigyosyos = Jigyosyo.objects.filter(
    #             update_user=request.user.username,
    #             merged_into__isnull=True,
    #             split_into__isnull=True,
    #         )
    #     serializer = JigyosyoSerializer(jigyosyos, many=True)
    #     return Response(serializer.data)

    @swagger_auto_schema(request_body=JigyosyoSerializer)
    def post(self, request):
        serializer = JigyosyoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(update_user=request.user.username)
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
        # if (
        #     request.user.username != jigyosyo.update_user
        #     and not request.user.is_superuser
        # ):
        #     return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = JigyosyoSerializer(jigyosyo)
        return Response(serializer.data)

    def put(self, request, pk):
        jigyosyo = self.get_object(pk)
        # if (
        #     request.user.username != jigyosyo.update_user
        #     and not request.user.is_superuser
        # ):
        #     return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = JigyosyoSerializer(jigyosyo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        jigyosyo = self.get_object(pk)
        # if (
        #     request.user.username != jigyosyo.update_user
        #     and not request.user.is_superuser
        # ):
        #     return Response(status=status.HTTP_403_FORBIDDEN)
        jigyosyo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class JigyosyoMergeSplitView(APIView):
    permission_classes = [IsAuthenticated]

    def merge(self, jigyosyo, merge_into):
        # Merge logic: Add related jigyosyos and delete the current one
        merge_into.related_jigyosyos.add(jigyosyo)
        jigyosyo.delete()

    def split(self, data):
        new_jigyosyo = Jigyosyo.objects.create(**data)
        return new_jigyosyo

    def post(self, request, pk):
        jigyosyo = Jigyosyo.objects.get(pk=pk)
        action_type = request.data.get("action_type")

        if (
            request.user.username != jigyosyo.update_user
            and not request.user.is_superuser
        ):
            return Response(status=status.HTTP_403_FORBIDDEN)

        if action_type == "merge":
            serializer = JigyosyoMergeSerializer(data=request.data)
            if serializer.is_valid():
                merge_into = serializer.validated_data["merge_into"]
                self.merge(jigyosyo, merge_into)
                return Response(
                    {"status": "merged successfully"}, status=status.HTTP_200_OK
                )

        elif action_type == "split":
            serializer = JigyosyoSplitSerializer(data=request.data)
            if serializer.is_valid():
                new_data = serializer.validated_data["new_jigyosyo_data"]
                new_jigyosyo = self.split(new_data)
                new_serializer = JigyosyoSerializer(new_jigyosyo)
                return Response(new_serializer.data, status=status.HTTP_201_CREATED)

        else:
            return Response(
                {"error": "Invalid action_type"}, status=status.HTTP_400_BAD_REQUEST
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JigyosyoManagementListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_superuser:
            managements = JigyosyoManagement.objects.all()
        else:
            managements = JigyosyoManagement.objects.filter(
                jigyosyo__update_user=request.user.username
            )
        serializer = JigyosyoManagementSerializer(managements, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = JigyosyoManagementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JigyosyoManagementDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return JigyosyoManagement.objects.get(pk=pk)
        except JigyosyoManagement.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        management = self.get_object(pk)
        if (
            request.user.username != management.jigyosyo.update_user
            and not request.user.is_superuser
        ):
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = JigyosyoManagementSerializer(management)
        return Response(serializer.data)

    def put(self, request, pk):
        management = self.get_object(pk)
        if (
            request.user.username != management.jigyosyo.update_user
            and not request.user.is_superuser
        ):
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = JigyosyoManagementSerializer(management, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        management = self.get_object(pk)
        if (
            request.user.username != management.jigyosyo.update_user
            and not request.user.is_superuser
        ):
            return Response(status=status.HTTP_403_FORBIDDEN)
        management.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class JigyosyoTransactionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_superuser:
            transactions = JigyosyoTransaction.objects.all().order_by("-id")
        else:
            transactions = JigyosyoTransaction.objects.filter(
                jigyosyo__update_user=request.user.username
            ).order_by("-id")
        serializer = JigyosyoTransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(request_body=JigyosyoTransactionSerializer)
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
        # if (
        #     request.user.username != transaction.jigyosyo.update_user
        #     and not request.user.is_superuser
        # ):
        #     return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = JigyosyoTransactionSerializer(transaction)
        return Response(serializer.data)

    # @swagger_auto_schema(request_body=JigyosyoTransactionSerializer)
    def put(self, request, pk):
        transaction = self.get_object(pk)
        # if (
        #     request.user.username != transaction.jigyosyo.update_user
        #     and not request.user.is_superuser
        # ):
        #     return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = JigyosyoTransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        transaction = self.get_object(pk)
        # if (
        #     request.user.username != transaction.jigyosyo.update_user
        #     and not request.user.is_superuser
        # ):
        #     return Response(status=status.HTTP_403_FORBIDDEN)
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
