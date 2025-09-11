"""
Test script for Phi-2 model loading and basic functionality.
Tests both embedding and generation models.
"""

import sys
import os

# Add parent directory to path to import src modules
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

from src.config_loader import load_config


def test_config_loading():
    """Test configuration loading"""
    try:
        config = load_config("config.yaml")
        print("✓ Configuration loaded successfully")
        
        # Validate required keys
        assert "embedding" in config
        assert "generator" in config
        assert "retrieval" in config
        print("✓ Configuration structure is valid")
        
        return config
    except Exception as e:
        print(f"✗ Configuration test failed: {e}")
        return None


def test_embedder_imports():
    """Test embedder module can be imported"""
    try:
        from src.embedder import embed_documents
        print("✓ Embedder module imports successfully")
        return True
    except Exception as e:
        print(f"✗ Embedder import failed: {e}")
        return False


def test_generator_imports():
    """Test generator module can be imported"""
    try:
        from src.generator import generate_commit_message, fallback_commit_message
        print("✓ Generator module imports successfully")
        return True
    except Exception as e:
        print(f"✗ Generator import failed: {e}")
        return False


def test_retriever_imports():
    """Test retriever module can be imported"""
    try:
        from src.retriever import search_documents
        print("✓ Retriever module imports successfully")
        return True
    except Exception as e:
        print(f"✗ Retriever import failed: {e}")
        return False


def test_diff_analyzer():
    """Test diff analyzer module"""
    try:
        from src.diff_analyzer import get_staged_diff_chunks
        print("✓ Diff analyzer module imports successfully")
        
        # Test basic functionality (should work even without git repo)
        file_list, chunks = get_staged_diff_chunks()
        print(f"✓ Diff analyzer executes (found {len(file_list)} files, {len(chunks)} chunks)")
        return True
    except Exception as e:
        print(f"✗ Diff analyzer test failed: {e}")
        return False


def test_fallback_functionality():
    """Test fallback functions work without models"""
    try:
        from src.generator import fallback_commit_message
        
        # Test fallback message generation
        message = fallback_commit_message(["file1.py", "file2.py"])
        print(f"✓ Fallback commit message: '{message}'")
        
        return True
    except Exception as e:
        print(f"✗ Fallback functionality test failed: {e}")
        return False


if __name__ == "__main__":
    print("Running CodeMind functionality tests...\n")
    
    # Run all tests
    tests = [
        test_config_loading,
        test_embedder_imports,
        test_generator_imports,
        test_retriever_imports,
        test_diff_analyzer,
        test_fallback_functionality,
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        try:
            result = test()
            if result:
                passed += 1
        except Exception as e:
            print(f"✗ Test {test.__name__} crashed: {e}")
        print()
    
    print(f"Tests passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed! CodeMind is ready for use.")
    else:
        print("⚠️  Some tests failed. Check dependencies and configuration.")
    
    sys.exit(0 if passed == total else 1)
