from abc import ABC, abstractmethod


URLType = str
HTMLType = str | None


class ClientInterface(ABC):
    @abstractmethod
    def get_html(self, url: URLType) -> HTMLType:
        pass
