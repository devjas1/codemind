import typer

from src.embedder import embed_documents
from src.retriever import search_documents
from src.generator import generate_commit_message, fallback_commit_message
from src.diff_analyzer import get_staged_diff_chunks
from src.config_loader import load_config


# Initialize Typer app
app = typer.Typer()
config = load_config("config.yaml")
print("Config loaded:", config)


# ===== CLI Commands =====
# `init` — Index Documents
@app.command()
def init(path: str = typer.Argument(...)):
    embeddings = embed_documents(path, config)
    if embeddings:
        typer.echo(f"Documents indexed successfully: {len(embeddings)} documents")
    else:
        typer.echo("No documents were indexed.")


# `search` — Semantic Lookup
@app.command()
def search(query: str):
    """
    Perform a semantic search on indexed documents.

    Args:
        query (str): The search query string.
    """
    results = search_documents(query, config)
    for i, result in enumerate(results):
        typer.echo(f"[{i+1}] {result}")


# `ask` — Retrieval-Augmented Generation (RAG)
@app.command()
def ask(query: str):
    """
    Perform a retrieval-augmented generation (RAG) process to answer a user query.

    Args:
        query (str): The user query string.
    """
    context = search_documents(query, config)
    prompt = "\n".join(context) + f"\n\nUser question: {query}"
    try:
        response = generate_commit_message(prompt, config)
    except (
        RuntimeError
    ):  # Replace with the specific exception type raised by generate_commit_message
        response = fallback_commit_message([])
    typer.echo(response)


# `commit` — Git Diff + Message Generation
@app.command()
def commit(preview: bool = True, apply: bool = False, dry_run: bool = False):
    """
    Generate a commit message based on staged Git diff chunks.

    Args:
        preview (bool): If True, display the suggested commit message.
        apply (bool): If True, apply the commit with the generated message.
        dry_run (bool): If True, display staged files and chunks without generating a message.
    """
    file_list, diff_chunks = get_staged_diff_chunks()

    if dry_run:
        typer.echo(f"Files staged: {len(file_list)}")
        typer.echo(f"Chunks: {len(diff_chunks)}")
        typer.echo(
            f"Estimated tokens: {sum(len(chunk.split()) for chunk in diff_chunks)}"
        )
        return

    prompt = "\n".join(diff_chunks) + "\n\nGenerate a commit message:"
    try:
        message = generate_commit_message(prompt, config)
    except Exception:
        message = fallback_commit_message(file_list)

    if preview:
        typer.echo(f"Suggested commit message:\n{message}")
    if apply:
        import subprocess

        subprocess.run(["git", "commit", "-m", message])


from sentence_transformers import SentenceTransformer

model = SentenceTransformer("./models/embeddinggemma-300m")
emb = model.encode("Test string")
print("Embedding shape:", emb.shape)  # Should be (768,)
