"""Extract staged diffs from Git -> Gives raw material for commit msg generation"""

import subprocess


def get_staged_diff_chunks():
    """
    Retrieves the list of staged files and their corresponding diff chunks.

    Returns:
        tuple: A tuple containing a list of staged file names and a list of diff chunks.
    """
    try:
        result = subprocess.run(
            ["git", "diff", "--cached"], capture_output=True, text=True, check=True
        )
        diff = result.stdout
        chunks = diff.split("\n@@") if diff else []  # Crude chunking

        file_list_result = subprocess.run(
            ["git", "diff", "--name-only", "--cached"],
            capture_output=True,
            text=True,
            check=True,
        )
        file_list = (
            file_list_result.stdout.splitlines() if file_list_result.stdout else []
        )

        return file_list, chunks
    except FileNotFoundError:
        print("Error: Git is not installed or not found in PATH.")
        return [], []
    except subprocess.CalledProcessError as e:
        print(f"Error running git command: {e}")
        return [], []
