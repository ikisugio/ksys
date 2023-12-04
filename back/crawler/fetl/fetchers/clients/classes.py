from requests.models import Response
from selenium import webdriver
import requests
from .types import ClientInterface, URLType, HTMLType


class SeleniumClient(ClientInterface):
    def __init__(self) -> None:
        self.driver = webdriver.Chrome()

    def _go(self, url: URLType) -> None:
        self.driver.get(url)
        return None

    def get_html(self, url: URLType) -> HTMLType:
        self._go(url)
        html = self.driver.page_source
        return html


class RequestsClient(ClientInterface):
    def __init__(self) -> None:
        self.session = requests.Session()

    def _get_request(self, url: URLType) -> Response:
        response = self.session.get(url)
        return response

    def get_html(self, url: URLType) -> HTMLType:
        response = self._get_request(url)
        html = response.text
        return html
