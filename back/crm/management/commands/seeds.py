import logging
from django.core.management.base import BaseCommand
from ...factories import (
    CustomUserFactory,
    JigyosyoFactory,
    CompanyFactory,
    JigyosyoTransactionFactory,
)

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Generate test data for models'

    def add_arguments(self, parser):
        parser.add_argument('model_type', type=str,
                            help='Model type to generate')
        parser.add_argument(
            'total', type=int, help='Indicates the number of records to be created')
        parser.add_argument('--detailed', '-d',
                            action='store_true', help='Print detailed log')

    def handle(self, *_, **kwargs):
        model_type = kwargs['model_type']
        total = kwargs['total']
        verbose = kwargs['verbosity']

        try:
            if model_type == "user":
                for _ in range(total):
                    user = CustomUserFactory.create()
                    if verbose:
                        self.stdout.write(self.style.SUCCESS(
                            f'User created: {user.username} - {user.email}'))
            elif model_type == "jigyosyo":
                for _ in range(total):
                    jigyosyo = JigyosyoFactory.create()
                    if verbose:
                        self.stdout.write(self.style.SUCCESS(
                            f'Jigyosyo created: {jigyosyo.name} - {jigyosyo.jigyosyo_code}'))
            elif model_type == "company":
                for _ in range(total):
                    company = CompanyFactory.create()
                    if verbose:
                        self.stdout.write(self.style.SUCCESS(
                            f'Company created: {company.name} - {company.company_code}'))
            elif model_type == "transaction":
                for _ in range(total):
                    transaction = JigyosyoTransactionFactory.create()
                    if verbose:
                        self.stdout.write(self.style.SUCCESS(
                            f'Transaction created for Jigyosyo: {transaction.jigyosyo.name} at {transaction.visit_datetime}'))
            else:
                self.stdout.write(self.style.ERROR(
                    f'Invalid model type: {model_type}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(
                f'Error creating {model_type}: {e}'))
