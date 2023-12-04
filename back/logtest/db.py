import logs.factories


print(f"__name__ is {__name__}")
logger = logs.factories.create_debug_logger(__name__)

logger.debug("this is imported")
logger.debug("this is imported")
logger.debug("this is imported")
logger.debug("this is imported")
logger.debug("this is imported")
logger.debug("this is imported")
