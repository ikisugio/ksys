from django.core.management.commands.runserver import Command as RunServerCommand
from django.conf import settings
import os


class Command(RunServerCommand):
    help = "Run the server with a specified database path"

    def add_arguments(self, parser):
        super().add_arguments(parser)
        parser.add_argument(
            '--db-path',
            dest='db_path',
            default='',
            help='Specifies the database path.',
        )

    def handle(self, *args, **options):
        db_path = options['db_path']
        if db_path:
            settings.DATABASES['default']['NAME'] = db_path
        super().handle(*args, **options)
