from sentence_transformers import SentenceTransformer

model = SentenceTransformer("./models/embeddinggemma-300m")
embedding = model.encode("This is a test string.")
print(embedding.shape)
