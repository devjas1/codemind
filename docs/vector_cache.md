# Vector Caching Strategy

To avoid redundant embedding, each document is hashed and compared against a local cache. If unchanged, the embedding step is skipped. This improves performance during repeated indexing.
