# CodeMind

A CLI tool for intelligent document analysis and commit message generation using EmbeddingGemma-300m for embeddings, FAISS for vector storage, and Phi-2 for text generation.

## Features

- **Document Indexing**: Embed and index documents for semantic search
- **Semantic Search**: Find relevant documents using natural language queries
- **Smart Commit Messages**: Generate meaningful commit messages from staged git changes
- **RAG (Retrieval-Augmented Generation)**: Answer questions using indexed document context

## Setup

### Prerequisites

- Windows 11
- Conda environment
- Git

### Installation

1. **Create a Conda environment:**

   ```bash
   conda create -n codemind python=3.9
   conda activate codemind
   ```

2. **Clone the repository:**

   ```bash
   git clone https://github.com/devjas1/codemind.git
   cd codemind
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Download models:**

   **Embedding Model (EmbeddingGemma-300m):**

   - Download from Hugging Face: `google/embeddinggemma-300m`
   - Place in `./models/embeddinggemma-300m/` directory

   **Generation Model (Phi-2 GGUF):**

   - Download the quantized Phi-2 model: `phi-2.Q4_0.gguf`
   - Place in `./models/` directory
   - Download from: [Microsoft Phi-2 GGUF](https://huggingface.co/microsoft/phi-2-gguf) or similar quantized versions

### Directory Structure

```
CodeMind/
├── cli.py                      # Main CLI entry point
├── config.yaml                 # Configuration file
├── requirements.txt            # Python dependencies
├── models/                     # Model storage
│   ├── embeddinggemma-300m/    # Embedding model directory
│   └── phi-2.Q4_0.gguf        # Phi-2 quantized model file
├── src/                        # Core modules
│   ├── config_loader.py        # Configuration management
│   ├── embedder.py             # Document embedding
│   ├── retriever.py            # Semantic search
│   ├── generator.py            # Text generation
│   └── diff_analyzer.py        # Git diff analysis
├── docs/                       # Documentation
└── vector_cache/              # FAISS index storage (auto-created)
```

## Usage

### Initialize Document Index

Index documents from a directory for semantic search:

```bash
python cli.py init ./docs/
```

This will:

- Embed all documents in the specified directory
- Create a FAISS index in `vector_cache/`
- Save metadata for retrieval

### Semantic Search

Search for relevant documents using natural language:

```bash
python cli.py search "how to configure the model"
```

Returns ranked results with similarity scores.

### Ask Questions (RAG)

Get answers based on your indexed documents:

```bash
python cli.py ask "What are the configuration options?"
```

Uses retrieval-augmented generation to provide contextual answers.

### Git Commit Message Generation

Generate intelligent commit messages from staged changes:

```bash
# Preview commit message without applying
python cli.py commit --preview

# Show staged files and analysis without generating message
python cli.py commit --dry-run

# Generate and apply commit message
python cli.py commit --apply
```

### Start API Server (Future Feature)

```bash
python cli.py serve --port 8000
```

_Note: API server functionality is planned for future releases._

## Configuration

Edit `config.yaml` to customize behavior:

```yaml
embedding:
  model_path: "./models/embeddinggemma-300m"
  dim: 768
  truncate_to: 128

generator:
  model_path: "./models/phi-2.Q4_0.gguf"
  quantization: "Q4_0"
  max_tokens: 512
  n_ctx: 2048

retrieval:
  vector_store: "faiss"
  top_k: 5
  similarity_threshold: 0.75

commit:
  tone: "imperative"
  style: "conventional"
  max_length: 72

logging:
  verbose: true
  telemetry: false
```

### Configuration Options

- **embedding.model_path**: Path to the EmbeddingGemma-300m model
- **generator.model_path**: Path to the Phi-2 GGUF model file
- **retrieval.top_k**: Number of documents to retrieve for context
- **retrieval.similarity_threshold**: Minimum similarity score for results
- **generator.max_tokens**: Maximum tokens for generation
- **generator.n_ctx**: Context window size for Phi-2

## Dependencies

- `sentence-transformers>=2.2.2` - Document embedding
- `faiss-cpu>=1.7.4` - Vector similarity search
- `llama-cpp-python>=0.2.23` - Phi-2 model inference (Windows compatible)
- `typer>=0.9.0` - CLI framework
- `PyYAML>=6.0` - Configuration file parsing

## Troubleshooting

### Model Loading Issues

If you encounter model loading errors:

1. **Embedding Model**: Ensure `embeddinggemma-300m` is a directory containing all model files
2. **Phi-2 Model**: Ensure `phi-2.Q4_0.gguf` is a single GGUF file
3. **Paths**: All paths in `config.yaml` should be relative to the project root

### Memory Issues

For systems with limited RAM:

- Use Q4_0 quantization for Phi-2 (already configured)
- Reduce `n_ctx` in config.yaml if needed
- Process documents in smaller batches

### Windows-Specific Issues

- Ensure `llama-cpp-python` version supports Windows
- Use PowerShell or Command Prompt for CLI commands
- Check file path separators in configuration

## Development

To test the modules:

```bash
python -c "from src import *; print('All modules imported successfully')"
```

To run in development mode:

```bash
python cli.py --help
```

## Contributing

Contributions to CodeMind are welcome! Please feel free to submit pull requests, create issues, or suggest new features.

## License

This project is licensed under the terms of the LICENSE file included in the repository.

© 2025 CodeMind. All rights reserved.
