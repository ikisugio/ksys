from datetime import date, datetime
from abc import ABC, abstractmethod
from bs4 import BeautifulSoup


ExtractType = dict[str, str | date | datetime | None]


class ExtractorInterface(ABC):
    def __init__(self, selectors: dict[str, str]):
        self.selectors = selectors

    @abstractmethod
    def extract(self, soup: BeautifulSoup) -> ExtractType:
        pass
