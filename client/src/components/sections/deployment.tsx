import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Server, Download, Rocket } from "lucide-react";

export function DeploymentSection() {
  const systemRequirements = [
    { label: "CPU", value: "Intel i5+ / AMD Ryzen 5+" },
    { label: "RAM", value: "16 GB minimum" },
    { label: "Storage", value: "10 GB+ SSD" },
    { label: "Platform", value: "Windows 11 (primary)" },
    { label: "Python", value: "3.10 (Conda managed)" },
    { label: "Models", value: "CPU-only execution" }
  ];

  const installationSteps = [
    { name: "Conda Environment", progress: 100, status: "✓ Complete", color: "bg-green-400" },
    { name: "sentence-transformers", progress: 100, status: "✓ Complete", color: "bg-green-400" },
    { name: "FAISS + Typer + PyYAML", progress: 100, status: "✓ Complete", color: "bg-green-400" },
    { name: "EmbeddingGemma-300m", progress: 75, status: "⟳ Downloading", color: "bg-yellow-400" },
    { name: "Phi-2 GGUF (Q4_0)", progress: 0, status: "⏳ Pending", color: "bg-muted" }
  ];

  const quickStartSteps = [
    {
      number: 1,
      title: "Conda Setup",
      commands: ["conda env create -f environment.yml", "conda activate gemma-phi2-cli", "pip install -e ."],
      color: "bg-primary"
    },
    {
      number: 2,
      title: "Model Download",
      commands: ["python download_models.py", "# Downloads EmbeddingGemma + Phi-2 GGUF"],
      color: "bg-accent"
    },
    {
      number: 3,
      title: "CLI Usage",
      commands: ["gemma-phi2-cli init ./my-project", "git add .", "gemma-phi2-cli commit --preview"],
      color: "bg-green-400"
    }
  ];

  return (
    <section id="deployment" className="space-y-6">
      <h2 className="text-2xl font-bold">Deployment & Setup</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* System Requirements */}
        <Card className="p-4 border-border">
          <h3 className="font-semibold mb-4 flex items-center">
            <Server className="mr-2 text-blue-400 w-4 h-4" />
            System Requirements
          </h3>
          <div className="space-y-3 text-sm">
            {systemRequirements.map((req, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground">{req.label}</span>
                <span className="font-medium" data-testid={`requirement-${req.label.toLowerCase()}`}>
                  {req.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Installation Progress */}
        <Card className="p-4 border-border">
          <h3 className="font-semibold mb-4 flex items-center">
            <Download className="mr-2 text-green-400 w-4 h-4" />
            Installation Progress
          </h3>
          <div className="space-y-4">
            {installationSteps.map((step, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{step.name}</span>
                  <span className={
                    step.status.includes("Complete") ? "text-green-400" :
                    step.status.includes("Downloading") ? "text-yellow-400" :
                    "text-muted-foreground"
                  } data-testid={`install-status-${index}`}>
                    {step.status}
                  </span>
                </div>
                <Progress 
                  value={step.progress} 
                  className="w-full h-2"
                  data-testid={`install-progress-${index}`}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Start Guide */}
      <Card className="p-6 border-border">
        <h3 className="font-semibold mb-4 flex items-center">
          <Rocket className="mr-2 text-primary w-4 h-4" />
          Quick Start Guide
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {quickStartSteps.map((step, index) => (
            <div key={index} className="space-y-3">
              <div className={`w-8 h-8 ${step.color} rounded-full flex items-center justify-center text-black font-bold`}>
                {step.number}
              </div>
              <h4 className="font-medium">{step.title}</h4>
              <Card className="bg-black/50 p-2 font-mono text-sm border-border">
                {step.commands.map((command, cmdIndex) => (
                  <div key={cmdIndex} data-testid={`quickstart-command-${index}-${cmdIndex}`}>
                    {command}
                  </div>
                ))}
              </Card>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
