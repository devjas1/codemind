"""
This script handles document embedding using EmbeddingGemma.
This is the entry point for indexing documents.
"""
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss
import os
import pickle
from typing import List, Tuple


def embed_documents(path: str, config: dict) -> List[Tuple[str, np.ndarray]]:
    """
    Embed documents from a directory and save to FAISS index.

    Args:
        path (str): Path to the directory containing the documents to embed.
        config (dict): Configuration dictionary.

    Returns:
        List of tuples containing (filename, embedding)
    """
    try:
        model = SentenceTransformer(config["embedding"]["model_path"])
        print(
            f"Initialized embedding model: {config['embedding']['model_path']}")
    except Exception as e:  # Changed to catch broader exception
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
                # Try different encodings to handle various file types
                for encoding in ['utf-8', 'latin-1', 'cp1252']:
                    try:
                        with open(fpath, "r", encoding=encoding) as f:
                            text = f.read()
                        break
                    except UnicodeDecodeError:
                        continue
                else:
                    print(
                        f"Could not decode file {fpath} with common encodings")
                    continue

                if text.strip():  # Only process non-empty files
                    emb = model.encode(text)
                    # Ensure all embeddings have the same dimension
                    if embeddings and emb.shape[0] != embeddings[0].shape[0]:
                        print(f"Dimension mismatch in file {fname}, skipping")
                        continue

                    embeddings.append(emb)
                    texts.append(text)
                    filenames.append(fname)

            except Exception as e:
                print(f"Error processing file {fpath}: {e}")

    if not embeddings:
        print("No documents were successfully embedded.")
        return []

    print("Embedder script started", flush=True)
    print(f"Documents in path: {os.listdir(path)}")
    print(f"Successfully processed {len(embeddings)} documents")

    # Create FAISS index
    dimension = embeddings[0].shape[0]
    index = faiss.IndexFlatIP(dimension)

    # Convert to numpy array and normalize
    embeddings_matrix = np.array(embeddings).astype("float32")
    faiss.normalize_L2(embeddings_matrix)  # Normalize for cosine similarity

    # Add normalized embeddings to index
    index.add(embeddings_matrix)

    # Save FAISS index and metadata
    os.makedirs("vector_cache", exist_ok=True)
    faiss.write_index(index, "vector_cache/faiss_index.bin")

    # Save metadata
    with open("vector_cache/metadata.pkl", "wb") as f:
        pickle.dump({"texts": texts, "filenames": filenames}, f)

    print(
        f"Saved FAISS index to vector_cache/ with {len(embeddings)} documents.")
    print(f"Total embeddings created: {len(embeddings)}")

    return list(zip(filenames, embeddings))


# Example usage
if __name__ == "__main__":
    config = {
        "embedding": {
            "model_path": "sentence-transformers/all-MiniLM-L6-v2"  # Example model
        }
    }
    result = embed_documents("./docs", config)
