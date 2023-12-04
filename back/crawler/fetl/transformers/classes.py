from .types import TransformType, TransformerInterface
from ..extractors.types import ExtractType


class Transformer(TransformerInterface):
    def __init__(self, mode: str):
        if mode == "list":
            pass
        elif mode == "detail":
            pass
        else:
            raise ValueError("mode is invalid")
        self.mode = mode

    def transform(self, data: ExtractType) -> TransformType:
        return data
