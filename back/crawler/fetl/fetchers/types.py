from abc import ABC, abstractmethod
from bs4 import BeautifulSoup
from .clients.types import URLType


FetchType = BeautifulSoup


class FetcherInterface(ABC):
    @abstractmethod
    def fetch(self, url: URLType) -> FetchType:
        pass
