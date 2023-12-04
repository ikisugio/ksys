from abc import ABC, abstractmethod
from ..transformers.types import TransformType


class LoaderInterface(ABC):
    @abstractmethod
    def load(self, data: TransformType) -> None:
        pass
