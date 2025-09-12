"""
This script handles document embedding using EmbeddingGemma.
This is the entry point for indexing documents.
"""

import os
import pickle
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer


def embed_documents(path: str, config: dict):
    """
    Embed documents from a directory and save to FAISS index.

    Args:
        path (str): Path to the directory containing the documents to embed.
        config (dict): Configuration dictionary.
    """
    try:
        model = SentenceTransformer(config["embedding"]["model_path"])
        print(f"Initalized embedding model: {config['embedding']['model_path']}")
    except ValueError as e:
        print(f"Error initializing embedding model: {e}")
        return []

    embeddings = []
    texts = []
    filenames = []

    # Read all documents
    for fname in os.listdir(path):
        fpath = os.path.join(path, fname)
        if os.path.isfile(fpath):
            try:
                with open(fpath, "r", encoding="utf-8") as f:
                    text = f.read()
                    if text.strip():  # Only process non-empty files
                        emb = model.encode(text)
                        embeddings.append(emb)
                        texts.append(text)
                        filenames.append(fname)
            except Exception as e:
                print(f"Error reading file {fpath}: {e}")

    if not embeddings:
        print("No documents were successfully embedded.")
        return []

    # Create FAISS index
    dimension = embeddings[0].shape[0]
    index = faiss.IndexFlatIP(dimension)

    # Normalize embeddings for cosine similarity
    embeddings_matrix = np.array(embeddings).astype("float32")
    faiss.normalize_L2(embeddings_matrix)
    # Add embeddings to index
    index.add(embeddings_matrix)

    # Save FAISS index and metadata
    os.makedirs("vector_cache", exist_ok=True)
    faiss.write_index(index, "vector_cache/faiss_index.bin")

    with open("vector_cache/metadata.pkl", "wb") as f:
        pickle.dump({"texts": texts, "filenames": filenames}, f)

    print(f"Saved FAISS index to vector_cache/ with {len(embeddings)} documents.")
    print(f"Total embeddings created: {len(embeddings)}")

    return list(zip(filenames, embeddings))
