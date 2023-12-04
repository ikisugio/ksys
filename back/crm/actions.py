from abc import ABC, abstractmethod


class BaseAction(ABC):
    @abstractmethod
    def execute(self):
        pass


class Action1(BaseAction):
    def execute(self):
        print("Action 1 is running")


class Action2(BaseAction):
    def execute(self):
        print("Action 2 is running")


class Action3(BaseAction):
    def execute(self):
        print("Action 3 is running")
