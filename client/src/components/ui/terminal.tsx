import { Card } from "@/components/ui/card";
import { Terminal } from "lucide-react";
import { useState, useEffect } from "react";

interface TerminalProps {
  className?: string;
}

export function TerminalComponent({ className = "" }: TerminalProps) {
  const [currentCommand, setCurrentCommand] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const terminalLines = [
    { type: "prompt", content: "gemma-phi2-cli init ./my-project" },
    { type: "success", content: "✓ Initializing project structure..." },
    { type: "success", content: "✓ Setting up vector store..." },
    { type: "success", content: "✓ Loading embedding model..." },
    { type: "success", content: "✓ Project initialized successfully!" },
    { type: "prompt", content: "gemma-phi2-cli commit --dry-run" },
    { type: "success", content: "→ Files staged: 3 | Chunks: 7 | Est. tokens: 1,247" },
    { type: "prompt", content: "gemma-phi2-cli commit --preview" },
    { type: "success", content: "→ feat: add DiffAnalyzer module with git integration" },
  ];

  return (
    <Card className={`border-border bg-card ${className}`}>
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold flex items-center">
          <Terminal className="mr-2 text-primary w-4 h-4" />
          Interactive Terminal
        </h3>
      </div>
      <div className="bg-black/50 p-4 font-mono text-sm">
        <div className="space-y-2">
          {terminalLines.map((line, index) => (
            <div key={index} className="flex items-center space-x-2">
              {line.type === "prompt" && <span className="text-green-400">$</span>}
              <span className={
                line.type === "prompt" 
                  ? "text-muted-foreground" 
                  : "text-cyan-400 ml-4"
              }>
                {line.content}
              </span>
            </div>
          ))}
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-green-400">$</span>
            <span className="text-white">gemma-phi2-cli ask "How do I implement caching?"</span>
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
