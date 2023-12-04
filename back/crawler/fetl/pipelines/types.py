from abc import ABC, abstractmethod
from ..fetchers.types import FetcherInterface, URLType
from ..extractors.types import ExtractorInterface
from ..transformers.types import TransformerInterface
from ..loaders.types import LoaderInterface


class PipelineInterface(ABC):
    @abstractmethod
    def __init__(
        self,
        fetcher: FetcherInterface,
        extractor: ExtractorInterface,
        transformer: TransformerInterface,
        loader: LoaderInterface,
    ):
        pass

    @abstractmethod
    def run(self, url: URLType) -> None:
        pass
