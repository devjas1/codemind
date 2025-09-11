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
def generate_commit_message(prompt: str, config: dict, max_tokens: int = None):
    """
    Generate a commit message using the Phi-2 model.
    
    Args:
        prompt (str): The input prompt for generation
        config (dict): Configuration dictionary containing model settings
        max_tokens (int, optional): Maximum tokens to generate
    
    Returns:
        str: Generated commit message
    """
    if max_tokens is None:
        max_tokens = config.get("generator", {}).get("max_tokens", 512)
    
    model_path = config["generator"]["model_path"]
    n_ctx = config.get("generator", {}).get("n_ctx", 2048)
    
    try:
        llm = Llama(model_path=model_path, n_ctx=n_ctx, verbose=False)
        response = llm(prompt, max_tokens=max_tokens)
        return response["choices"][0]["text"].strip()
    except Exception as e:
        raise RuntimeError(f"Failed to generate with Phi-2: {e}")


# Fallback Logic
def fallback_commit_message(file_list: list):
    return f"Update {len(file_list)} files: {', '.join(file_list)}"
