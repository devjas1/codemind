"""
Directly loads the Phi-2 GGUF model, used for text generation tasks
like commit message creation or answering semantice queries.
"""

from llama_cpp import Llama


# Model Loader
def load_phi2(model_path: str, context_window: int = 2048):
    """
    Loads the Llama model with the specified model path and context window size.

    Args:
        model_path (str): The file path to the Llama model.
        context_window (int, optional): The size of the context window. Defaults to 2048.

    Returns:
        Llama: An instance of the Llama model.
    """
    return Llama(model_path=model_path, n_ctx=context_window)


# Generation Function
def generate_commit_message(llm, prompt: str, max_tokens: int = 512):
    response = llm(prompt, max_tokens=max_tokens)
    return response["choices"][0]["text"].strip()


# Fallback Logic
def fallback_commit_message(file_list: list):
    return f"Update {len(file_list)} files: {', '.join(file_list)}"
