from django.core.management.base import BaseCommand
from crawler.libs import scrape_detail


class Command(BaseCommand):
    help = "Run the scrape_list.run function with an optional argument"

    def add_arguments(self, parser):
        # Optional arguments
        parser.add_argument(
            "--arg",
            type=str,
            help="An optional argument for the run function",
            default=None,
        )

    def handle(self, *args, **kwargs):
        arg_value = kwargs.get("arg", None)
        if arg_value:
            message = f"Function executed with argument: {arg_value}"
        else:
            message = "Function executed without an argument"
        self.stdout.write(self.style.SUCCESS(message))
        scrape_detail.run()