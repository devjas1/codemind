"""
Retriever module for semantic document search using FAISS.

Provides functions to perform similarity-based lookups over embedded document vectors.
Integrates with FAISS for efficient vector search and returns relevant document matches.
"""

import os
import pickle
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer


def search_documents(query: str, config: dict):
    """
    Search for semantically similar documents using FAISS index.
    
    Args:
        query (str): Search query
        config (dict): Configuration dictionary
        
    Returns:
        list: List of relevant text chunks with similarity scores
    """
    # Check if FAISS index exists
    if not os.path.exists("vector_cache/faiss_index.bin"):
        print("No FAISS index found. Please run 'init' command first.")
        return []
    
    try:
        # Load FAISS index and metadata
        index = faiss.read_index("vector_cache/faiss_index.bin")
        
        with open("vector_cache/metadata.pkl", "rb") as f:
            metadata = pickle.load(f)
        
        texts = metadata["texts"]
        filenames = metadata["filenames"]
        
        # Embed the query
        model = SentenceTransformer(config["embedding"]["model_path"])
        query_embedding = model.encode([query]).astype('float32')
        faiss.normalize_L2(query_embedding)
        
        # Search similar documents
        top_k = config.get("retrieval", {}).get("top_k", 5)
        similarity_threshold = config.get("retrieval", {}).get("similarity_threshold", 0.75)
        
        scores, indices = index.search(query_embedding, top_k)
        
        results = []
        for i, (score, idx) in enumerate(zip(scores[0], indices[0])):
            if score >= similarity_threshold:
                results.append(f"[{filenames[idx]}] (score: {score:.3f}): {texts[idx][:200]}...")
            else:
                break
        
        if not results:
            results.append(f"No matches found above threshold {similarity_threshold}")
            
        return results
        
    except Exception as e:
        print(f"Error during search: {e}")
        return [f"Search failed: {e}"]
