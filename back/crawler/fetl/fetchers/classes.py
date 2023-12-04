from bs4 import BeautifulSoup
from .types import URLType, FetchType, FetcherInterface
from .clients.types import ClientInterface
from .clients.classes import SeleniumClient, RequestsClient
from .rules import crawl_list


class Fetcher(FetcherInterface):
    def __init__(self, mode: str):
        if mode == "list":
            self.client: ClientInterface = SeleniumClient()
        elif mode == "detail":
            self.client: ClientInterface = RequestsClient()
        else:
            raise ValueError("mode is invalid")
        self.mode = mode

    def spider_list(self, url: URLType) -> None:
        crawl_list.run(url)
        return None

    def fetch(self, url: URLType) -> FetchType:
        html: str | None = self.client.get_html(url)
        if html is None:
            raise ValueError("html is None")
        soup: FetchType = BeautifulSoup(html, "lxml")
        return soup
