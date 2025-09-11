"""
This script handles document embedding using EmbeddingGemma.
This is the entry point for indexing documents.
TODO: Wire this to FAISS
"""

import os
from sentence_transformers import SentenceTransformer


def embed_documents(path: str, config: dict):
    try:
        model = SentenceTransformer(config["embedding"]["model_path"])
    except Exception as e:
        print(f"Error loading model: {str(e)}")

    model = SentenceTransformer(config["embedding"]["model_path"])
    embeddings = []

    for fname in os.listdir(path):
        with open(os.path.join(path, fname), "r", encoding="utf-8") as f:
            text = f.read()
            emb = model.encode(text)
            if emb is not None:
                embeddings.append((fname, emb))
            else:
                print(f"Embedding failed for {fname}.")

    print(f"Total embeddings created: {len(embeddings)}")
    return embeddings

    # TODO: Save embeddings to disk or vector store
