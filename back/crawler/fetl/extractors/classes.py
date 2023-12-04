from .types import ExtractType, ExtractorInterface
from .selectors import list_selectors, detail_selectors
from ..fetchers.types import FetchType


class Extractor(ExtractorInterface):
    def __init__(self, mode: str) -> None:
        if mode == "list":
            self.selectors = list_selectors
        elif mode == "detail":
            self.selectors = detail_selectors
        else:
            raise ValueError("mode is invalid")
        self.mode = mode

    def extract(self, soup: FetchType) -> ExtractType:
        return {
            key: (element.text.strip() if element is not None else None)
            for key, selector in self.selectors.items()
            for element in [soup.select_one(selector)]
        }
