from views import test_debug, double


def test_test_debug():
    # 期待される出力値を設定
    expected = 72  # この値は、関数のロジックに基づいて変更する
    # test_debug 関数を実行
    result = test_debug(10, 7)
    # アサートで結果を検証
    assert result == expected


def test_double():
    # 期待される出力値を設定
    expected = 20  # この値は、関数のロジックに基づいて変更する
    # double 関数を実行
    result = double(10)
    # アサートで結果を検証
    assert result == expected
