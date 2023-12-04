from typing import Any


def attr_dict(dicts_: list[dict[Any, Any]], key: str, value: str) -> dict[Any, Any]:
    return {dict_[key]: dict_[value] for dict_ in dicts_}


def make_dict_from_variables(*args: str) -> dict[str, Any]:
    my_dict: dict[str, Any] = {}
    for var_name in args:
        if var_name in globals():
            my_dict[var_name] = globals()[var_name]
    return my_dict


def recursive_dict_update(
    original_dict: dict[Any, Any], added_dict: dict[Any, Any]
) -> None:
    for added_key, added_value in added_dict.items():
        if (
            added_key in original_dict
            and isinstance(added_value, dict)
            and isinstance(original_dict[added_key], dict)
        ):
            recursive_dict_update(original_dict[added_key], added_value)  # type: ignore
        else:
            original_dict[added_key] = added_value
