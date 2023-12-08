from rest_framework import serializers
from .models import (
    CustomUser,
    Company,
    Jigyosyo,
    JigyosyoManagement,
    JigyosyoTransaction,
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
    company = CompanySerializer()

    class Meta:
        model = Jigyosyo
        fields = "__all__"


class JigyosyoManagementSerializer(serializers.ModelSerializer):
    jigyosyo = JigyosyoSerializer()

    class Meta:
        model = JigyosyoManagement
        fields = "__all__"


class JigyosyoTransactionSerializer(serializers.ModelSerializer):
    management = JigyosyoManagementSerializer()

    class Meta:
        model = JigyosyoTransaction
        fields = "__all__"


class JigyosyoMergeSerializer(serializers.Serializer):
    merge_into = serializers.PrimaryKeyRelatedField(queryset=Jigyosyo.objects.all())


class JigyosyoSplitSerializer(serializers.Serializer):
    new_jigyosyo_data = JigyosyoSerializer()
