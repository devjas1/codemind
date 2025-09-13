**Live on Hugging Face Spaces:**  
[![HuggingFace](https://img.shields.io/badge/-HuggingFace-FDEE21?style=for-the-badge&logo=HuggingFace&logoColor=black)](https://huggingface.co/spaces/dev-jas/CodeMind)

# CodeMind

**CodeMind** is a AI-powered development assistant that runs entirely on your local machine for intelligent document analysis and commit message generation. It leverages modern machine learning models for: helping you understand your codebase through semantic search and generates meaningful commit messages using locally hosted language models, ensuring complete privacy and no cloud dependencies.

- **Efficient Knowledge Retrieval**: Makes searching and querying documentation more power☺ful by using semantic embeddings rather than keyword search.
- **Smarter Git Workflow**: Automates the creation of meaningful commit messages by analyzing git diffs and using an LLM to summarize changes.
- **AI-Powered Documentation**: Enables you to ask questions about your project, using your own docs/context rather than just generic answers.

---

## Features

- **Document Embedding** (using [EmbeddingGemma-300m](https://huggingface.co/google/embeddinggemma-300m))
- **Semantic Search** (using [FAISS](https://github.com/facebookresearch/faiss) for vector similarity search)
- **Commit Message Generation** (using [Phi-2](https://huggingface.co/microsoft/phi-2-gguf) for text generation): Automatically generate descriptive commit messages based on your changes
- **Retrieval-Augmented Generation (RAG)**: Answers questions using indexed document context
- **Local Processing**: All AI processing happens on your machine with no data sent to cloud services
- **Flexible Configuration**: Customize models and parameters to suit your specific needs
- **FAISS Integration**: Efficient vector similarity search for fast retrieval
- **Multiple Model Support**: Compatible with GGUF and SentenceTransformers models

## Prerequisites

- **Python 3.8 or higher**
- **8GB+ RAM** recommended (for running language models)
- **4GB+ disk space** for model files
- **Git** for repository cloning

### Platform Recommendations

- **Linux** (Recommended for best compatibility)
- **macOS** (Good compatibility)
- **Windows** (May require additional setup for some dependencies)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/devjas1/codemind.git
cd codemind
```

### 2. Set Up Python Environment

Create and activate a virtual environment:

```bash

# Create virtual environment
python -m venv venv

# Activate on macOS/Linux
source venv/bin/activate

# Activate on Windows
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

**Note**: If you encounter installation errors related to C++/PyTorch/FAISS:

- Ensure you have Python development tools installed
- Linux/macOS are preferred for FAISS compatibility
- On Windows, you may need to install Visual Studio Build Tools

## Model Setup

### Directory Structure

Create the following directory structure for model files:

```text
models/
  ├── phi-2.Q4_0.gguf              # For commit message generation (Phi-2 model)
  └── embeddinggemma-300m/         # For document embedding (EmbeddingGemma model)
      └── [model files here]
```

### Downloading Models

1. **Phi-2 Model** (for commit message generation):

   - Download `phi-2.Q4_0.gguf` from a trusted source
   - Place it in the `models/` directory

2. **EmbeddingGemma Model** (for document embedding):

   - Download the EmbeddingGemma-300m model files
   - Place all files in the `models/embeddinggemma-300m/` directory

> **Note**: The specific process for obtaining these models may vary. Check the documentation in each model folder for detailed instructions.

## Configuration

Edit the `config.yaml` file to match your local setup:

```yaml
# Model configuration for commit message generation
generator:
  model_path: "./models/phi-2.Q4_0.gguf"
  quantization: "Q4_0"
  max_tokens: 512
  n_ctx: 2048

# Model configuration for document embedding
embedding:
  model_path: "./models/embeddinggemma-300m"

# Retrieval configuration for semantic search
retrieval:
  vector_store: "faiss"
  top_k: 5 # Number of results to return
  similarity_threshold: 0.7 # Minimum similarity score (0.0 to 1.0)
```

### Configuration Tips

- Adjust `top_k` to control how many results are returned for each query
- Modify `similarity_threshold` to filter results by relevance
- Ensure all file paths are correct for your system
- For larger codebases, you may need to increase `max_tokens`

## Indexing Documents

To enable semantic search over your documentation or codebase, you need to create a FAISS index:

```bash
# Basic usage
python src/embedder.py path/to/your/documents config.yaml

# Example with docs directory
python src/embedder.py ./docs config.yaml

# Example with specific code directory
python src/embedder.py ./src config.yaml
```

This process:

1. Reads all documents from the specified directory
2. Generates embeddings using the configured model
3. Creates a FAISS index in the `vector_cache/` directory
4. Enables fast semantic search capabilities

> **Note**: The indexing process may take several minutes depending on the size of your codebase and your hardware capabilities.

## Usage

### Command Line Interface

Run the main CLI interface:

```bash
python cli.py
```

### Available Commands

#### Get Help

```bash
python cli.py --help
```

#### Ask Questions About Your Codebase

```bash
python cli.py ask "How does this repository work?"
python cli.py ask "Where is the main configuration handled?"
python cli.py ask "Show me examples of API usage"
```

#### Generate Commit Messages

```bash
# Preview a generated commit message
python cli.py commit --preview

# Generate commit message without preview
python cli.py commit
```

#### API Server (Placeholder)

```bash
python cli.py serve --port 8000
```

> **Note**: The API server functionality is not yet implemented. This command will display: "API server functionality not implemented yet."

### Advanced Usage

For more advanced usage, you can modify the configuration to:

- Use different models for specific tasks
- Adjust the context window size for larger documents
- Customize the similarity threshold for retrieval
- Use different vector stores (though FAISS is currently the only supported option)

## Troubleshooting

### Common Issues

#### Model Errors

**Problem**: Model files not found or inaccessible  
**Solution**:

- Verify model files are in the correct locations
- Check file permissions
- Ensure the paths in `config.yaml` are correct

#### FAISS Errors

**Problem**: "No FAISS index found" error  
**Solution**:

- Run the embedder script to create the index
- Ensure the `vector_cache/` directory has write permissions

```bash
python src/embedder.py path/to/documents config.yaml
```

#### SentenceTransformers Issues

**Problem**: Compatibility errors with SentenceTransformers  
**Solution**:

- Check that the model format is compatible with SentenceTransformers
- Verify the version in requirements.txt
- Ensure all model files are present in the model directory

#### Performance Issues

**Problem**: Slow response times  
**Solution**:

- Ensure you have adequate RAM
- Consider using smaller quantized models
- Close other memory-intensive applications

#### Platform-Specific Issues

**Windows-specific issues**:

- FAISS may require additional compilation
- Path separators may need adjustment in configuration

**macOS/Linux**:

- Generally fewer compatibility issues
- Ensure you have write permissions for all directories

### Validation Checklist

- All model files present in correct directories
- FAISS index built in `vector_cache/`
- `config.yaml` paths match your local setup
- Python environment activated
- All dependencies installed
- Adequate disk space available
- Sufficient RAM available

### Getting Detailed Error Information

For specific errors, run commands with verbose output:

```bash
# Add debug flags if available
python cli.py --verbose ask "Your question"
```

## Project Structure

```text
codemind/
├── models/                 # AI model files
│   ├── phi-2.Q4_0.gguf    # Phi-2 model for generation
│   └── embeddinggemma-300m/ # Embedding model
│       └── [model files]
├── src/                   # Source code
│   └── embedder.py        # Document embedding script
├── vector_cache/          # FAISS vector store (auto-generated)
├── config.yaml           # Configuration file
├── requirements.txt      # Python dependencies
├── cli.py               # Command-line interface
└── README.md            # This file
```

## FAQ

> **Q:** **Can I use different models?**  
> **A:** Yes, you can use any GGUF-compatible model for generation and any SentenceTransformers-compatible model for embeddings. Update the paths in `config.yaml` accordingly.

---

> **Q:** **How much RAM do I need?**  
> **A**: For the Phi-2 Q4_0 model, 8GB RAM is recommended. Larger models will require more memory.

---

> **Q:** **Can I index multiple directories?**  
> **A**: Yes, you can run the embedder script multiple times with different directories, or combine your documents into one directory before indexing.

---

> **Q:** **Is my data sent to the cloud?**  
> **A**: No, all processing happens locally on your machine. No code or data is sent to external services.

---

> **Q:** **How often should I re-index my documents?**  
> **A**: Re-index whenever your documentation or codebase changes significantly to keep search results relevant.

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all model files are in correct locations
3. Confirm Python and library versions match requirements
4. Ensure proper directory permissions

For specific errors, please include the full traceback when seeking assistance.

## Contributing

Contributions to CodeMind are welcome! Please feel free to submit pull requests, create issues, or suggest new features.

## License

This project is licensed under the terms of the LICENSE file included in the repository.
