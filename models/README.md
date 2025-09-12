# Download Models for CodeMind

You need to download compatible model files (such as `phi-2.Q4_0.gguf`) to use CodeMind locally. There are two main ways to obtain these models:

---

## Option 1: Download via Hugging Face Web Interface

1. Visit the [Hugging Face model page](https://huggingface.co/TheBloke/phi-2-GGUF).
2. Locate the desired file (e.g., `phi-2.Q4_0.gguf`) in the "Files and versions" section.
3. Click the file name to download it directly.
4. Move the downloaded file into your `./models` directory within your CodeMind repository.

[![HuggingFace](https://img.shields.io/badge/-HuggingFace-FDEE21?style=for-the-badge&logo=HuggingFace&logoColor=black)](https://huggingface.co/TheBloke/phi-2-GGUF)

---

## Option 2: Download Using Python and `huggingface_hub`

If you prefer automation, you can use the `huggingface_hub` Python library:

### 1. Install the library

```bash
pip install huggingface_hub
```

### 2. Download the model file

Create a Python script (e.g., `download_model.py`) with the following code:

```python
from huggingface_hub import hf_hub_download

repo_id = "TheBloke/phi-2-GGUF"  # Change if using a different repo
filename = "phi-2.Q4_0.gguf"
local_dir = "./models"

hf_hub_download(repo_id=repo_id, filename=filename, local_dir=local_dir)
print(f"Downloaded {filename} to {local_dir}")
```

- Replace `repo_id` and `filename` if you need a different model or file.
- Make sure `local_dir` matches your desired storage location.

### 3. Run the script

```bash
python download_model.py
```

This will download the specified file into your `models` directory.

---

## Notes

- Always verify the model license and compatibility before use.
- For other models, repeat the steps above with the appropriate repository and filename.
- For more details, see the [Hugging Face documentation](https://huggingface.co/docs/huggingface_hub).
