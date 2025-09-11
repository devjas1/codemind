import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Search, Wand2, FolderTree, GitCommit } from "lucide-react";

export function OverviewSection() {
  const features = [
    {
      icon: Brain,
      title: "EmbeddingGemma-300m",
      description: "High-precision text embedding for semantic search",
      color: "text-primary"
    },
    {
      icon: Search,
      title: "FAISS Vector Store",
      description: "Efficient similarity search and clustering",
      color: "text-accent"
    },
    {
      icon: Wand2,
      title: "Phi-2 Generator",
      description: "2.7B parameter model for contextual responses",
      color: "text-purple-400"
    },
    {
      icon: FolderTree,
      title: "Commit Assistant",
      description: "Git diff analysis and intelligent commit message generation",
      color: "text-orange-400"
    }
  ];

  const projectStructure = [
    { type: "folder", name: "gemma-phi2-cli/", level: 0 },
    { type: "folder", name: "models/", level: 1, badge: "AI Models" },
    { type: "folder", name: "embeddinggemma-300m/", level: 2 },
    { type: "folder", name: "phi2-quantized/", level: 2 },
    { type: "folder", name: "data/", level: 1 },
    { type: "folder", name: "index/", level: 2, badge: "Vector Store" },
    { type: "folder", name: "src/", level: 1 },
    { type: "file", name: "embedder.py", level: 2 },
    { type: "file", name: "retriever.py", level: 2 },
    { type: "file", name: "generator.py", level: 2 },
    { type: "file", name: "diff_analyzer.py", level: 2 },
    { type: "file", name: "cli.py", level: 2 },
    { type: "folder", name: "tests/", level: 1, badge: "Unit Tests" },
    { type: "file", name: "test_embedder.py", level: 2 },
    { type: "file", name: "test_retriever.py", level: 2 },
    { type: "file", name: "test_generator.py", level: 2 },
    { type: "folder", name: "examples/", level: 1, badge: "Sample Repo" },
    { type: "file", name: "sample_repo/", level: 2 },
    { type: "file", name: "config.yaml", level: 1 },
    { type: "file", name: "environment.yml", level: 1 },
    { type: "file", name: "README.md", level: 1 },
  ];

  return (
    <section id="overview" className="space-y-6">
      <div className="gradient-border">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Project Overview</h2>
              <p className="text-muted-foreground">
                A seamless CLI assistant that combines EmbeddingGemma's precision with Phi-2's generative capabilities.
              </p>
            </div>
            <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
              v1.0.0
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-secondary/50 p-4 border-border">
                <div className="flex items-center space-x-3 mb-2">
                  <feature.icon className={`${feature.color} w-5 h-5`} />
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          <Card className="bg-muted/30 p-4 border-border">
            <h3 className="font-semibold mb-3 flex items-center">
              <GitCommit className="mr-2 text-orange-400 w-4 h-4" />
              Data Flow Pipeline
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between bg-black/30 p-3 rounded">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span className="text-sm">Git Diff Analysis</span>
                </div>
                <span className="text-muted-foreground text-xs">diff_analyzer.py</span>
              </div>
              <div className="flex justify-center">
                <div className="text-muted-foreground">↓</div>
              </div>
              <div className="flex items-center justify-between bg-black/30 p-3 rounded">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span className="text-sm">Text Embedding</span>
                </div>
                <span className="text-muted-foreground text-xs">embedder.py</span>
              </div>
              <div className="flex justify-center">
                <div className="text-muted-foreground">↓</div>
              </div>
              <div className="flex items-center justify-between bg-black/30 p-3 rounded">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="text-sm">Context Retrieval</span>
                </div>
                <span className="text-muted-foreground text-xs">retriever.py</span>
              </div>
              <div className="flex justify-center">
                <div className="text-muted-foreground">↓</div>
              </div>
              <div className="flex items-center justify-between bg-black/30 p-3 rounded">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <span className="text-sm">Message Generation</span>
                </div>
                <span className="text-muted-foreground text-xs">generator.py</span>
              </div>
            </div>
          </Card>

          <Card className="bg-muted/30 p-4 border-border">
            <h3 className="font-semibold mb-3 flex items-center">
              <FolderTree className="mr-2 text-primary w-4 h-4" />
              Project Structure
            </h3>
            <div className="font-mono text-sm space-y-1 text-muted-foreground">
              {projectStructure.map((item, index) => (
                <div key={index} className="flex items-center" style={{ marginLeft: `${item.level * 16}px` }}>
                  <i className={`${item.type === 'folder' ? 'fas fa-folder text-blue-400' : 'fas fa-file text-green-400'} mr-2`}></i>
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge className="ml-2 text-xs bg-secondary px-2 py-1">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
