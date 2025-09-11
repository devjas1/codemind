import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCode, Edit, Save } from "lucide-react";

export function ConfigurationSection() {
  const configContent = `# Gemma-Phi2-CLI Configuration
models:
  embedder:
    path: "./models/embeddinggemma-300m"
    batch_size: 32
    device: "cpu"
  generator:
    path: "./models/phi2-quantized.gguf"
    quantization: "Q4_0"
    max_tokens: 2048
    temperature: 0.7
    format: "gguf"

embedding:
  dim: 768
  truncate_to: 128
  sentence_transformers: true

vector_store:
  type: "faiss"
  index_path: "./data/index"
  persistence: true

retrieval:
  top_k: 5
  similarity_threshold: 0.75
  rerank: false

performance:
  cache_embeddings: true
  chunk_size: 500
  chunk_overlap: 50

commit:
  tone: "imperative"
  style: "conventional"  # Options: conventional | descriptive | terse
  max_length: 72
  preview_by_default: true
  fallback_enabled: true
  dry_run_default: false

logging:
  level: "INFO"
  file: "./logs/gemma-phi2.log"
  verbose: true
  telemetry: false
  rotate_logs: true

environment:
  conda_env: "gemma-phi2-cli"
  python_version: "3.10"
  platform: "windows"`;

  return (
    <section id="configuration" className="space-y-6">
      <h2 className="text-2xl font-bold">Configuration Management</h2>
      
      <Card className="border-border">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold flex items-center">
            <FileCode className="mr-2 text-yellow-400 w-4 h-4" />
            config.yaml
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" data-testid="button-edit-config">
              <Edit className="mr-1 w-3 h-3" />
              Edit
            </Button>
            <Button size="sm" data-testid="button-save-config">
              <Save className="mr-1 w-3 h-3" />
              Save
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <div className="syntax-highlight">
              {configContent.split('\n').map((line, index) => {
                let className = '';
                if (line.trim().startsWith('#')) {
                  className = 'comment';
                } else if (line.includes(':') && !line.trim().startsWith(' ')) {
                  className = 'keyword';
                } else if (line.includes('"')) {
                  className = 'string';
                }
                
                return (
                  <div key={index} className={className} data-testid={`config-line-${index}`}>
                    {line || '\u00A0'}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}