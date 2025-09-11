"""
This module loads YAML config creating a
centralized config directory accessible across modules.
"""

import yaml


def load_config(path: str = "config.yaml") -> dict:
    """
    Load a YAML configuration file.

    Args:
        path (str): The path to the YAML configuration file. Defaults to "config.yaml".

    Returns:
        dict: The contents of the YAML file as a dictionary.
    """
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)
