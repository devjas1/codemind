# EmbeddingGemma-300m Model Files

This directory should contain all files required for the EmbeddingGemma-300m model in a format compatible with [SentenceTransformers](https://www.sbert.net/).

---

## 1. Required Files

Typically, you need the following files:

- `config.json`
- `pytorch_model.bin` or `model.safetensors`
- `tokenizer.json`
- `tokenizer_config.json`
- `vocab.txt` (if applicable)

---

## 2. How to Obtain the Files

### Option 1: Download via Hugging Face Web Interface

1. Visit the [EmbeddingGemma-300m model page](https://huggingface.co/google/embeddinggemma-300m).
2. Download each file listed above manually.
3. Place all files in the `models/embeddinggemma-300m/` directory.

[![HuggingFace](https://img.shields.io/badge/-HuggingFace-FDEE21?style=for-the-badge&logo=HuggingFace&logoColor=black)](https://huggingface.co/google/embeddinggemma-300m)

### Option 2: Download Using Git

If you have [Git LFS](https://git-lfs.com/) installed, you can clone the entire repository:

```bash
git lfs install
git clone https://huggingface.co/google/embeddinggemma-300m models/embeddinggemma-300m
```

This will download all necessary files into the correct directory.

---

## 3. Directory Structure Example

```
models/
└── embeddinggemma-300m/
    ├── config.json
    ├── pytorch_model.bin
    ├── tokenizer.json
    ├── tokenizer_config.json
    └── vocab.txt
```

---

## 4. Validation

After placing the files, you can load the model in Python:

```python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer("./models/embeddinggemma-300m")
```

---

## Notes

- Ensure all files are present for proper embedding functionality.
- For updates or troubleshooting, refer to the [Hugging Face documentation](https://huggingface.co/docs).
- Always verify model license and compatibility before use.
