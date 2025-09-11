from sentence_transformers import SentenceTransformer

model = SentenceTransformer("google/embeddinggemma-300m")

query = "Which planet is known as the Red Planet?"
docs = [
    "Mars, known for its reddish appearance, is often referred to as the Red Planet.",
    "Venus is similar in size to Earth.",
]
import numpy as np

q_emb = np.array(model.encode_query(query))
d_emb = np.array(model.encode_document(docs))

print(q_emb.shape, d_emb.shape)
