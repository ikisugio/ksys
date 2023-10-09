from django.contrib.auth.models import Group
from django.core.management import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Create a superuser and assign to a specified group'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str,
                            help='The username of the superuser')
        parser.add_argument('password', type=str,
                            help='The password of the superuser')
        parser.add_argument(
            'group_name', type=str, help='The name of the group to which the superuser will be added')

    def handle(self, *args, **kwargs):
        username = kwargs['username']
        password = kwargs['password']
        group_name = kwargs['group_name']

        # Create the superuser
        User = get_user_model()
        superuser = User.objects.create_superuser(
            username=username, password=password)

        # Get or create the group
        group, created = Group.objects.get_or_create(name=group_name)

        # Assign the superuser to the group
        superuser.groups.add(group)
        superuser.save()

        self.stdout.write(self.style.SUCCESS(
            f'Superuser {username} created and assigned to group {group_name}'))
