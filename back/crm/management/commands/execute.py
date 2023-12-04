from django.core.management.base import BaseCommand, CommandError
from crm import actions
import inspect


class Command(BaseCommand):
    help = "Run actions from actions.py"

    def add_arguments(self, parser):
        parser.add_argument(
            "action_name",
            nargs="?",
            type=str,
            help="Name of the action to run (optional)",
        )

    def handle(self, **options):
        action_name = options.get("action_name")

        if not action_name:
            self.stdout.write("Running all actions")
            for name, obj in inspect.getmembers(actions):
                if (
                    inspect.isclass(obj)
                    and issubclass(obj, actions.BaseAction)
                    and obj is not actions.BaseAction
                ):
                    self.perform_execute(name, obj)
            self.stdout.write(self.style.SUCCESS("Successfully ran all actions"))
        else:
            action_class = getattr(actions, action_name, None)

            if action_class is None:
                raise CommandError(f"action '{action_name}' does not exist")

            if (
                not issubclass(action_class, actions.BaseAction)
                or action_class is actions.BaseAction
            ):
                raise CommandError(
                    f"action '{action_name}' is not a subclass of BaseAction"
                )

            self.perform_execute(action_name, action_class)

    def perform_execute(self, action_name, action_class):
        self.stdout.write(f"Running action: {action_name}")
        instance = action_class()
        instance.execute()
        self.stdout.write(
            self.style.SUCCESS(f"Successfully performed execute {action_name}")
        )
