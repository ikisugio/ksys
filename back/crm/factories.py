import uuid
import factory
from random import choice
from faker import Faker
from factory.django import DjangoModelFactory
from django.utils import timezone
from .models import (
    CustomUser,
    Jigyosyo,
    Company,
    JigyosyoTransaction,
)

faker = Faker("ja_JP")


def get_random_user():
    users = CustomUser.objects.all()
    return choice(users) if users else None


def get_random_company():
    companies = Company.objects.all()
    return choice(companies) if companies else None


def generate_jigyosyo_name():
    words = faker.words(2)
    return f"{words[0].capitalize()}{words[1].capitalize()}事業所"


class CustomUserFactory(DjangoModelFactory):
    class Meta:
        model = CustomUser

    email = factory.LazyAttribute(lambda _: f"{uuid.uuid4()}@example.com")
    username = factory.LazyAttribute(lambda _: f"USER_{uuid.uuid4()}")
    password = factory.PostGenerationMethodCall("set_password", "password")
    date_joined = factory.LazyAttribute(
        lambda _: timezone.make_aware(faker.date_time_this_year())
    )
    is_active = True
    is_staff = True


class CompanyFactory(DjangoModelFactory):
    class Meta:
        model = Company

    company_code = factory.LazyAttribute(lambda _: faker.uuid4())
    shubetsu = factory.LazyAttribute(lambda _: faker.company_suffix())
    name = factory.LazyAttribute(lambda _: faker.company())
    name_kana = factory.LazyAttribute(lambda _: faker.first_name())
    postal_code = factory.LazyAttribute(lambda _: faker.zipcode())
    address = factory.LazyAttribute(lambda _: faker.address())
    tel_number = factory.LazyAttribute(lambda _: faker.phone_number())
    fax_number = factory.LazyAttribute(lambda _: faker.phone_number())
    url = factory.LazyAttribute(lambda _: faker.url())
    repr_name = factory.LazyAttribute(lambda _: faker.name())
    repr_position = factory.LazyAttribute(lambda _: faker.job())
    established_date = factory.LazyAttribute(
        lambda _: timezone.make_aware(faker.date_time_this_century())
    )
    release_datetime = factory.LazyAttribute(
        lambda _: timezone.make_aware(faker.date_time_this_year())
    )
    update_user = factory.LazyAttribute(
        lambda _: get_random_user() or CustomUserFactory()
    )


class JigyosyoFactory(DjangoModelFactory):
    class Meta:
        model = Jigyosyo

    jigyosyo_code = factory.LazyAttribute(lambda _: faker.uuid4())
    company = factory.LazyAttribute(lambda _: get_random_company() or CompanyFactory())
    type = factory.LazyAttribute(lambda _: faker.company_suffix())
    name = factory.LazyAttribute(lambda _: generate_jigyosyo_name())
    postal_code = factory.LazyAttribute(lambda _: faker.zipcode())
    address = factory.LazyAttribute(lambda _: faker.address())
    tel_number = factory.LazyAttribute(lambda _: faker.phone_number())
    fax_number = factory.LazyAttribute(lambda _: faker.phone_number())
    repr_name = factory.LazyAttribute(lambda _: faker.name())
    repr_position = factory.LazyAttribute(lambda _: faker.job())
    kourou_jigyosyo_url = factory.LazyAttribute(lambda _: faker.url())
    kourou_release_datetime = factory.LazyAttribute(
        lambda _: timezone.make_aware(faker.date_time_this_year())
    )
    update_user = factory.LazyAttribute(lambda _: f"USER_{uuid.uuid4()}")

    free_description = factory.LazyAttribute(lambda _: faker.text(max_nb_chars=200))

    @factory.post_generation
    def add_children(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for child in extracted:
                self.children.add(child)
        else:
            default_child = JigyosyoFactory()
            self.children.add(default_child)


class JigyosyoTransactionFactory(DjangoModelFactory):
    class Meta:
        model = JigyosyoTransaction

    @factory.lazy_attribute
    def jigyosyo(self):
        if choice([True] * 7 + [False] * 3):
            existing_jigyosyos = Jigyosyo.objects.all()
            if existing_jigyosyos:
                return choice(existing_jigyosyos)
        return JigyosyoFactory()

    visit_datetime = factory.LazyAttribute(
        lambda _: timezone.make_aware(faker.date_time_this_year())
    )
    content = factory.LazyAttribute(lambda _: faker.text(max_nb_chars=200))
