from django.core.management.base import BaseCommand
from crawler.fetl.fetchers import Fetcher


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
        arg_value = kwargs["arg"]
        if arg_value:
            run(arg_value)
            self.stdout.write(
                self.style.SUCCESS(f"Function executed with argument: {arg_value}")
            )
        else:
            fetcher = Fetcher("list")
            fetcher.spider_list("https://www.kaigokensaku.mhlw.go.jp/")
            self.stdout.write(
                self.style.SUCCESS(f"Function executed without an argument")
            )
