from abc import ABC, abstractmethod
from ..extractors.types import ExtractType

TransformType = ExtractType


class TransformerInterface(ABC):
    @abstractmethod
    def transform(self, data: ExtractType) -> TransformType:
        pass
