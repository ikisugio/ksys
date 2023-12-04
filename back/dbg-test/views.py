def test_debug(a: int, b: int) -> int:
    x = a * 2
    y = b * 3
    w = x + double(y)

    def f():
        print("f")
        print("gg")

    z = w + 10
    f()
    return z


def double(x: int) -> int:
    z = x * 2
    print("double!!")
    return z


g = 10
h = 7


i = 0
while i < 10:
    print("test")
    test_debug(g, h)
    i += 1
