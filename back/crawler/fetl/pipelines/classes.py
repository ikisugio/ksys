from .types import PipelineInterface
from ..fetchers.types import FetcherInterface, URLType, FetchType
from ..extractors.types import ExtractorInterface, ExtractType
from ..transformers.types import TransformerInterface, TransformType
from ..loaders.types import LoaderInterface
from ..fetchers.classes import Fetcher
from ..extractors.classes import Extractor
from ..transformers.classes import Transformer
from ..loaders.classes import Loader


class Pipeline(PipelineInterface):
    def __init__(self, mode: str):
        self.fetcher: FetcherInterface = Fetcher(mode)
        self.extractor: ExtractorInterface = Extractor(mode)
        self.transformer: TransformerInterface = Transformer(mode)
        self.loader: LoaderInterface = Loader(mode)

    def run(self, url: URLType) -> None:
        soup: FetchType = self.fetcher.fetch(url)
        raw_data: ExtractType = self.extractor.extract(soup)
        refined_data: TransformType = self.transformer.transform(raw_data)
        self.loader.load(refined_data)
        return None
