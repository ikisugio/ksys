class Test1:
    print("this is test1")


class Test2:
    print("this is test2")

    class Test2_1:
        print("this is test2_1")

    @classmethod
    def test():
        print("this is test2")


def glb_test():
    print("this is glb_test")


@classmethod
def glb_test2(cls):
    print("this is glb_test2")


class Test3:
    print("this is test3")


class Test4:
    _name = "this is test6"
    print(_name)

    @classmethod
    def test(cls):
        print(cls._name)
