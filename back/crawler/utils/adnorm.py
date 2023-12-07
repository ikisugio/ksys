import re
import jaconv
from normalize_japanese_addresses import normalize


def replace_address(input_string: str) -> str:
    convert_map = {
        "O": "0",
        "一": "1",
        "二": "2",
        "三": "3",
        "四": "4",
        "五": "5",
        "六": "6",
        "七": "7",
        "八": "8",
        "九": "9",
        "十": "10",
        "丁目": "-",
    }

    # Use regular expressions to replace characters
    for k, v in convert_map.items():
        input_string = re.sub(k, v, input_string)

    return input_string


def full_norm(address: str) -> str:
    # normalized_address: dict[str, str] = normalize(address)  # type: ignore
    # joined_address = (
    #     normalized_address["pref"]
    #     + normalized_address["city"]
    #     + normalized_address["town"]
    #     + normalized_address["addr"]
    # )
    # hankaku_address = jaconv.z2h(joined_address, digit=True, ascii=False)
    # assert isinstance(hankaku_address, str)
    # addr = replace_address(hankaku_address)
    addr = address
    return addr
