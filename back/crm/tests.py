from django.urls import reverse
from django.contrib.auth.models import Group
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, Company, Jigyosyo, JigyosyoTransaction
from .factories import CustomUserFactory, CompanyFactory, JigyosyoFactory, JigyosyoTransactionFactory


class JigyosyoSearchTestCase(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='test@example.com', password='testpassword')
        group = Group.objects.create(name="Test Group")
        self.user.groups.add(group)
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        self.company = Company.objects.create(name='Test Company')
        self.jigyosyo = Jigyosyo.objects.create(
            name='Test Jigyosyo', company=self.company, address='Tokyo')

    def test_jigyosyo_search(self):
        response = self.client.get(reverse('jigyosyo-search'), {'q': 'Test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Jigyosyo')


class JigyosyoTransactionSearchTestCase(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='test@example.com', password='testpassword')
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        self.company = Company.objects.create(name='Test Company')
        self.jigyosyo = Jigyosyo.objects.create(
            name='Test Jigyosyo', company=self.company)
        self.jigyosyo_transaction = JigyosyoTransaction.objects.create(
            content='Test Content', jigyosyo=self.jigyosyo)

    def test_jigyosyo_transaction_search(self):
        response = self.client.get(
            reverse('jigyosyo-transaction-search'), {'q': 'Test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['content'], 'Test Content')


class JigyosyoTransactionTestCase(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='test@example.com', password='testpassword')
        group = Group.objects.create(name="Test Group")
        self.user.groups.add(group)
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        self.company = Company.objects.create(name='Test Company')
        self.jigyosyo = Jigyosyo.objects.create(
            name='Test Jigyosyo', company=self.company)
        self.jigyosyo.save()
        self.jigyosyo_transaction = JigyosyoTransaction.objects.create(
            content='Test Content', jigyosyo=self.jigyosyo)
        self.jigyosyo_transaction.save()

    def test_jigyosyo_transaction_creation(self):
        data = {
            'content': 'New Test Content',
            'jigyosyo': self.jigyosyo.id,
        }
        response = self.client.post(reverse('jigyosyo-transaction-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(JigyosyoTransaction.objects.count(), 2)

    def test_jigyosyo_transaction_retrieval(self):
        response = self.client.get(
            reverse('jigyosyo-transaction-detail', args=[self.jigyosyo_transaction.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], 'Test Content')

    def test_jigyosyo_transaction_update(self):
        data = {
            'content': 'Updated Test Content',
            'jigyosyo': self.jigyosyo.id,
        }
        response = self.client.put(
            reverse('jigyosyo-transaction-detail', args=[self.jigyosyo_transaction.id]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.jigyosyo_transaction.refresh_from_db()
        self.assertEqual(self.jigyosyo_transaction.content,
                         'Updated Test Content')

    def test_jigyosyo_transaction_deletion(self):
        response = self.client.delete(
            reverse('jigyosyo-transaction-detail', args=[self.jigyosyo_transaction.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(JigyosyoTransaction.objects.count(), 0)


class UserRegistrationAndAuthenticationTestCase(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='test@example.com', password='testpassword')

    def test_user_registration(self):
        data = {
            'email': '111111111111test@example.com',
            'password': 'testpassword2'
        }
        response = self.client.post(reverse('user-register'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('access' in response.data)

    def test_user_authentication(self):
        data = {
            'email': 'test@example.com',
            'password': 'testpassword'
        }
        response = self.client.post(reverse('token-obtain-pair'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)


class JigyosyoTestCase(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='test@example.com', password='testpassword')
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        self.jigyosyo = Jigyosyo.objects.create(name='Test Jigyosyo')
        self.jigyosyo.save()

    def test_jigyosyo_creation(self):
        data = {
            'name': 'New Test Jigyosyo',
        }
        response = self.client.post(reverse('jigyosyo-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Jigyosyo.objects.count(), 2)

    def test_jigyosyo_retrieval(self):
        response = self.client.get(
            reverse('jigyosyo-detail', args=[self.jigyosyo.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Jigyosyo')

    def test_jigyosyo_update(self):
        data = {
            'name': 'Updated Test Jigyosyo',
        }
        response = self.client.put(
            reverse('jigyosyo-detail', args=[self.jigyosyo.id]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.jigyosyo.refresh_from_db()
        self.assertEqual(self.jigyosyo.name, 'Updated Test Jigyosyo')

    def test_jigyosyo_deletion(self):
        response = self.client.delete(
            reverse('jigyosyo-detail', args=[self.jigyosyo.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Jigyosyo.objects.count(), 0)


class CompanyTestCase(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='test@example.com', password='testpassword')
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        self.company = Company.objects.create(name='Test Company')

    def test_company_creation(self):
        data = {
            'name': 'New Test Company',
        }
        response = self.client.post(reverse('company-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Company.objects.count(), 2)

    def test_company_retrieval(self):
        response = self.client.get(
            reverse('company-detail', args=[self.company.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Company')

    def test_company_update(self):
        data = {
            'name': 'Updated Test Company',
        }
        response = self.client.put(
            reverse('company-detail', args=[self.company.id]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.company.refresh_from_db()
        self.assertEqual(self.company.name, 'Updated Test Company')

    def test_company_deletion(self):
        response = self.client.delete(
            reverse('company-detail', args=[self.company.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Company.objects.count(), 0)


class CustomUserTestCase(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='test@example.com', password='testpassword')
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {self.access_token}')

    def test_custom_user_creation(self):
        data = {
            'email': 'newuser@example.com',
            'password': 'newpassword'
        }
        response = self.client.post(reverse('user-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CustomUser.objects.count(), 2)

    def test_custom_user_retrieval(self):
        response = self.client.get(
            reverse('user-detail', args=[self.user.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'test@example.com')

    def test_custom_user_update(self):
        data = {
            'email': 'updated@example.com',
        }
        response = self.client.put(
            reverse('user-detail', args=[self.user.id]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.email, 'updated@example.com')

    def test_custom_user_deletion(self):
        response = self.client.delete(
            reverse('user-detail', args=[self.user.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(CustomUser.objects.count(), 0)
