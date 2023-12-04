from .types import LoaderInterface
from ..transformers.types import TransformType


class Loader(LoaderInterface):
    def __init__(self, mode: str):
        if mode == "list":
            pass
        elif mode == "detail":
            pass
        else:
            raise ValueError("mode is invalid")
        self.mode = mode

    def _test_load(self, data: TransformType) -> None:
        print(data)
        print("------- data is loaded -------")
        return None

    def load(self, data: TransformType) -> None:
        self._test_load(data)
        return None
