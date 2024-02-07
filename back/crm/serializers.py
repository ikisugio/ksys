from rest_framework import serializers
from .models import (
    CustomUser,
    Company,
    Jigyosyo,
    JigyosyoManagement,
    JigyosyoTransaction,
    # TransactionStaffDetail,
)


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class JigyosyoSerializer(serializers.ModelSerializer):
    company = CompanySerializer(required=False)

    class Meta:
        model = Jigyosyo
        fields = "__all__"


class JigyosyoManagementSerializer(serializers.ModelSerializer):
    jigyosyo = JigyosyoSerializer(required=False)

    class Meta:
        model = JigyosyoManagement
        fields = "__all__"


# class TransactionStaffDetailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TransactionStaffDetail
#         fields = "__all__"


class JigyosyoTransactionSerializer(serializers.ModelSerializer):
    # staff_details = TransactionStaffDetailSerializer(many=True, required=False)

    class Meta:
        model = JigyosyoTransaction
        fields = "__all__"

    # def create(self, validated_data):
    #     staff_details_data = validated_data.pop("staff_details", [])
    #     transaction = JigyosyoTransaction.objects.create(**validated_data)
    #     for staff_detail_data in staff_details_data:
    #         TransactionStaffDetail.objects.create(
    #             transaction=transaction, **staff_detail_data
    #         )
    #     return transaction

    # def update(self, instance, validated_data):
    #     staff_details_data = validated_data.pop("staff_details", None)

    #     # 既存のフィールドを更新
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
    #     instance.save()

    #     # staff_details の更新処理
    #     if staff_details_data is not None:
    #         # 既存の staff_details レコードを取得し、IDでマッピング
    #         existing_ids = [
    #             staff_detail.id for staff_detail in instance.staff_details.all()
    #         ]
    #         input_ids = [item.get("id", None) for item in staff_details_data]

    #         # 新しいデータで既存のレコードを更新、または新しいレコードを作成
    #         for staff_detail_data in staff_details_data:
    #             staff_detail_id = staff_detail_data.get("id", None)
    #             if staff_detail_id and staff_detail_id in existing_ids:
    #                 staff_detail_instance = TransactionStaffDetail.objects.get(
    #                     id=staff_detail_id, transaction=instance
    #                 )
    #                 for attr, value in staff_detail_data.items():
    #                     setattr(staff_detail_instance, attr, value)
    #                 staff_detail_instance.save()
    #             else:
    #                 TransactionStaffDetail.objects.create(
    #                     transaction=instance, **staff_detail_data
    #                 )

    #         # 不要になったレコードを削除
    #         for staff_detail_id in existing_ids:
    #             if staff_detail_id not in input_ids:
    #                 TransactionStaffDetail.objects.filter(
    #                     id=staff_detail_id, transaction=instance
    #                 ).delete()

    #     return instance


class JigyosyoMergeSerializer(serializers.Serializer):
    merge_into = serializers.PrimaryKeyRelatedField(queryset=Jigyosyo.objects.all())


class JigyosyoSplitSerializer(serializers.Serializer):
    new_jigyosyo_data = JigyosyoSerializer()
