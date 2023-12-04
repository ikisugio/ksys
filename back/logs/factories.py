import logging


def create_debug_logger(name: str, level=logging.DEBUG):
    logger = logging.getLogger(name)
    logger.setLevel(level)

    _formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )

    handler = logging.FileHandler(f"logs/{name}.log")
    handler.setLevel(level)
    handler.setFormatter(_formatter)

    logger.addHandler(handler)

    return logger
