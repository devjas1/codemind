from llama_cpp import Llama

llm = Llama(model_path="./models/phi-2.Q4_0.gguf", n_ctx=2048)

response = llm("What is the capital of France?")
print(response)


from sentence_transformers import SentenceTransformer

model = SentenceTransformer("./models/embeddinggemma-300m")
emb = model.encode("Test string")
print(emb.shape)
