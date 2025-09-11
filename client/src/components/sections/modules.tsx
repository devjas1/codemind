import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Brain, Search, Wand2, GitBranch, ChevronDown, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

export function ModulesSection() {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(["embedder"]));

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  return (
    <section id="modules" className="space-y-6">
      <h2 className="text-2xl font-bold">Module Configuration</h2>
      
      {/* Embedder Module */}
      <Card className="border-border overflow-hidden">
        <div className="p-4 bg-secondary/30 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="text-primary w-5 h-5" />
              <h3 className="font-semibold">Embedder Module</h3>
              <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                Active
              </Badge>
            </div>
            <button
              onClick={() => toggleModule("embedder")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="toggle-embedder"
            >
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${
                  expandedModules.has("embedder") ? "rotate-180" : ""
                }`} 
              />
            </button>
          </div>
        </div>
        {expandedModules.has("embedder") && (
          <div className="p-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="embedder-path" className="text-sm font-medium mb-2 block">Model Path</Label>
                <Input
                  id="embedder-path"
                  type="text"
                  defaultValue="./models/embeddinggemma-300m/"
                  className="font-mono"
                  data-testid="input-embedder-path"
                />
              </div>
              <div>
                <Label htmlFor="embedder-batch" className="text-sm font-medium mb-2 block">Batch Size</Label>
                <Input
                  id="embedder-batch"
                  type="number"
                  defaultValue="32"
                  data-testid="input-embedder-batch"
                />
              </div>
            </div>
            <Card className="bg-muted/20 p-4 border-border">
              <h4 className="font-medium mb-2 flex items-center">
                <i className="fas fa-code mr-2 text-accent"></i>
                Implementation Status
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400 w-4 h-4" />
                  <span>Model loading interface</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400 w-4 h-4" />
                  <span>Text preprocessing pipeline</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-yellow-400 w-4 h-4" />
                  <span>Batch processing optimization</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Card>

      {/* Retriever Module */}
      <Card className="border-border overflow-hidden">
        <div className="p-4 bg-secondary/30 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Search className="text-accent w-5 h-5" />
              <h3 className="font-semibold">Retriever Module</h3>
              <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                Active
              </Badge>
            </div>
            <button
              onClick={() => toggleModule("retriever")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="toggle-retriever"
            >
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${
                  expandedModules.has("retriever") ? "rotate-180" : ""
                }`} 
              />
            </button>
          </div>
        </div>
        {expandedModules.has("retriever") && (
          <div className="p-4 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="vector-store" className="text-sm font-medium mb-2 block">Vector Store</Label>
                <Select defaultValue="faiss">
                  <SelectTrigger id="vector-store" data-testid="select-vector-store">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faiss">FAISS</SelectItem>
                    <SelectItem value="chroma">Chroma</SelectItem>
                    <SelectItem value="pinecone">Pinecone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="top-k" className="text-sm font-medium mb-2 block">Top-K Results</Label>
                <Input
                  id="top-k"
                  type="number"
                  defaultValue="5"
                  data-testid="input-top-k"
                />
              </div>
              <div>
                <Label htmlFor="similarity-threshold" className="text-sm font-medium mb-2 block">Similarity Threshold</Label>
                <Input
                  id="similarity-threshold"
                  type="number"
                  defaultValue="0.7"
                  step="0.1"
                  data-testid="input-similarity-threshold"
                />
              </div>
            </div>
            <Card className="bg-muted/20 p-4 border-border">
              <h4 className="font-medium mb-2">Index Statistics</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="stat-documents">1,247</div>
                  <div className="text-muted-foreground">Documents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent" data-testid="stat-embeddings">89,432</div>
                  <div className="text-muted-foreground">Embeddings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400" data-testid="stat-size">2.3GB</div>
                  <div className="text-muted-foreground">Index Size</div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Card>

      {/* DiffAnalyzer Module */}
      <Card className="border-border overflow-hidden">
        <div className="p-4 bg-secondary/30 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GitBranch className="text-orange-400 w-5 h-5" />
              <h3 className="font-semibold">DiffAnalyzer Module</h3>
              <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                Active
              </Badge>
            </div>
            <button
              onClick={() => toggleModule("diffanalyzer")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="toggle-diffanalyzer"
            >
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${
                  expandedModules.has("diffanalyzer") ? "rotate-180" : ""
                }`} 
              />
            </button>
          </div>
        </div>
        {expandedModules.has("diffanalyzer") && (
          <div className="p-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="chunk-size" className="text-sm font-medium mb-2 block">Chunk Size</Label>
                <Input
                  id="chunk-size"
                  type="number"
                  defaultValue="500"
                  data-testid="input-chunk-size"
                />
              </div>
              <div>
                <Label htmlFor="max-files" className="text-sm font-medium mb-2 block">Max Files</Label>
                <Input
                  id="max-files"
                  type="number"
                  defaultValue="50"
                  data-testid="input-max-files"
                />
              </div>
            </div>
            <Card className="bg-muted/20 p-4 border-border">
              <h4 className="font-medium mb-2 flex items-center">
                <i className="fas fa-git mr-2 text-orange-400"></i>
                Git Integration
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400 w-4 h-4" />
                  <span>Git diff parsing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400 w-4 h-4" />
                  <span>Staged changes detection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400 w-4 h-4" />
                  <span>Logical section chunking</span>
                </div>
              </div>
            </Card>
            <Card className="bg-black/50 p-4 border-border">
              <h4 className="font-medium mb-2 flex items-center">
                <i className="fas fa-code-branch mr-2 text-blue-400"></i>
                Sample Diff Chunk
              </h4>
              <div className="font-mono text-xs space-y-1">
                <div className="text-muted-foreground">diff --git a/src/embedder.py b/src/embedder.py</div>
                <div className="text-muted-foreground">index 1a2b3c4..5d6e7f8 100644</div>
                <div className="text-muted-foreground">--- a/src/embedder.py</div>
                <div className="text-muted-foreground">+++ b/src/embedder.py</div>
                <div className="text-cyan-400">@@ -45,6 +45,12 @@ class Embedder:</div>
                <div className="text-red-400">-        return self.model.encode(texts)</div>
                <div className="text-green-400">+        embeddings = self.model.encode(texts)</div>
                <div className="text-green-400">+        # Cache embeddings for faster retrieval</div>
                <div className="text-green-400">+        self._cache_embeddings(texts, embeddings)</div>
                <div className="text-green-400">+        return embeddings</div>
              </div>
            </Card>
          </div>
        )}
      </Card>

      {/* Generator Module */}
      <Card className="border-border overflow-hidden">
        <div className="p-4 bg-secondary/30 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wand2 className="text-purple-400 w-5 h-5" />
              <h3 className="font-semibold">Generator Module</h3>
              <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">
                Loading
              </Badge>
            </div>
            <button
              onClick={() => toggleModule("generator")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="toggle-generator"
            >
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${
                  expandedModules.has("generator") ? "rotate-180" : ""
                }`} 
              />
            </button>
          </div>
        </div>
        {expandedModules.has("generator") && (
          <div className="p-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="generator-model" className="text-sm font-medium mb-2 block">Model</Label>
                <Input
                  id="generator-model"
                  type="text"
                  defaultValue="microsoft/phi-2"
                  className="font-mono"
                  data-testid="input-generator-model"
                />
              </div>
              <div>
                <Label htmlFor="quantization" className="text-sm font-medium mb-2 block">Quantization</Label>
                <Select defaultValue="4bit">
                  <SelectTrigger id="quantization" data-testid="select-quantization">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4bit">4-bit (Q4)</SelectItem>
                    <SelectItem value="5bit">5-bit (Q5)</SelectItem>
                    <SelectItem value="8bit">8-bit (Q8)</SelectItem>
                    <SelectItem value="16bit">16-bit (FP16)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="commit-style" className="text-sm font-medium mb-2 block">Commit Style</Label>
                <Select defaultValue="conventional">
                  <SelectTrigger id="commit-style" data-testid="select-commit-style">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conventional">Conventional (feat:, fix:)</SelectItem>
                    <SelectItem value="descriptive">Descriptive (detailed)</SelectItem>
                    <SelectItem value="terse">Terse (minimal)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="max-tokens" className="text-sm font-medium mb-2 block">Max Tokens</Label>
                <Input
                  id="max-tokens"
                  type="number"
                  defaultValue="2048"
                  data-testid="input-max-tokens"
                />
              </div>
              <div>
                <Label htmlFor="temperature" className="text-sm font-medium mb-2 block">Temperature</Label>
                <Input
                  id="temperature"
                  type="number"
                  defaultValue="0.7"
                  step="0.1"
                  data-testid="input-temperature"
                />
              </div>
              <div>
                <Label htmlFor="top-p" className="text-sm font-medium mb-2 block">Top-P</Label>
                <Input
                  id="top-p"
                  type="number"
                  defaultValue="0.9"
                  step="0.1"
                  data-testid="input-top-p"
                />
              </div>
            </div>
            <Card className="bg-muted/20 p-4 border-border">
              <h4 className="font-medium mb-2 flex items-center">
                <i className="fas fa-code-commit mr-2 text-purple-400"></i>
                Commit Message Generation
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400 w-4 h-4" />
                  <span>Conventional commit format</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400 w-4 h-4" />
                  <span>Imperative tone enforcement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-yellow-400 w-4 h-4" />
                  <span>Context-aware suggestions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400 w-4 h-4" />
                  <span>Fallback logic for model failures</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400 w-4 h-4" />
                  <span>Style presets (conventional/descriptive/terse)</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Card>
    </section>
  );
}
