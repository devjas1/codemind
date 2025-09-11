import { Card } from "@/components/ui/card";
import { TerminalComponent } from "@/components/ui/terminal";
import { Terminal, Play, Settings } from "lucide-react";

export function CommandsSection() {
  const coreCommands = [
    {
      command: "gemma-phi2-cli init [path]",
      description: "Initialize or update index from target directory",
      color: "text-accent"
    },
    {
      command: "gemma-phi2-cli search [query]",
      description: "Semantic lookup returning file names and scores",
      color: "text-accent"
    },
    {
      command: "gemma-phi2-cli ask [question]",
      description: "Retrieval + generation in one step",
      color: "text-accent"
    },
    {
      command: "gemma-phi2-cli serve",
      description: "Launch local API server for integrations",
      color: "text-accent"
    },
    {
      command: "gemma-phi2-cli commit [--preview|--apply]",
      description: "Generate commit messages from staged changes",
      color: "text-accent"
    },
    {
      command: "gemma-phi2-cli commit --dry-run",
      description: "Show file count, chunks, and token estimates",
      color: "text-accent"
    }
  ];

  const utilityCommands = [
    {
      command: "gemma-phi2-cli status",
      description: "Show current configuration and model status",
      color: "text-accent"
    },
    {
      command: "gemma-phi2-cli config [key] [value]",
      description: "Get or set configuration parameters",
      color: "text-accent"
    },
    {
      command: "gemma-phi2-cli clear",
      description: "Clear vector store and cached embeddings",
      color: "text-accent"
    },
    {
      command: "gemma-phi2-cli --help",
      description: "Display detailed help and usage examples",
      color: "text-accent"
    },
    {
      command: "gemma-phi2-cli commit --preview",
      description: "Preview generated commit message without applying",
      color: "text-accent"
    },
    {
      command: "gemma-phi2-cli config --list-presets",
      description: "Show available commit style presets",
      color: "text-accent"
    }
  ];

  return (
    <section id="commands" className="space-y-6">
      <h2 className="text-2xl font-bold">CLI Commands</h2>
      
      <div className="grid gap-6">
        <TerminalComponent />

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-4 border-border">
            <h4 className="font-semibold mb-4 flex items-center">
              <Play className="mr-2 text-green-400 w-4 h-4" />
              Core Commands
            </h4>
            <div className="space-y-3 text-sm">
              {coreCommands.map((cmd, index) => (
                <Card key={index} className="bg-secondary/50 p-3 border-border">
                  <div className={`font-mono ${cmd.color} mb-1`} data-testid={`command-${index}`}>
                    {cmd.command}
                  </div>
                  <div className="text-muted-foreground">{cmd.description}</div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-4 border-border">
            <h4 className="font-semibold mb-4 flex items-center">
              <Settings className="mr-2 text-yellow-400 w-4 h-4" />
              Utility Commands
            </h4>
            <div className="space-y-3 text-sm">
              {utilityCommands.map((cmd, index) => (
                <Card key={index} className="bg-secondary/50 p-3 border-border">
                  <div className={`font-mono ${cmd.color} mb-1`} data-testid={`utility-command-${index}`}>
                    {cmd.command}
                  </div>
                  <div className="text-muted-foreground">{cmd.description}</div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
