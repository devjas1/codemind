import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/ui/navigation";
import { OverviewSection } from "@/components/sections/overview";
import { ModulesSection } from "@/components/sections/modules";
import { CommandsSection } from "@/components/sections/commands";
import { ConfigurationSection } from "@/components/sections/configuration";
import { DeploymentSection } from "@/components/sections/deployment";
import { Bot, Circle, Download, MemoryStick, Cpu, Database } from "lucide-react";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />;
      case "modules":
        return <ModulesSection />;
      case "commands":
        return <CommandsSection />;
      case "configuration":
        return <ConfigurationSection />;
      case "deployment":
        return <DeploymentSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="text-primary-foreground w-4 h-4" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Gemma-Phi2-CLI</h1>
                <p className="text-sm text-muted-foreground">Intelligent Document Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Circle className="text-green-500 w-3 h-3 fill-current" />
                <span>Ready</span>
              </div>
              <Button size="sm" data-testid="button-export-config">
                <Download className="mr-2 w-3 h-3" />
                Export Config
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Navigation 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />
          </div>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            {renderSection()}
          </main>
        </div>
      </div>

      {/* Status Bar */}
      <footer className="bg-secondary/50 border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MemoryStick className="text-blue-400 w-4 h-4" />
                <span className="text-muted-foreground">Memory: </span>
                <span className="font-medium" data-testid="status-memory">8.2/16 GB</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cpu className="text-green-400 w-4 h-4" />
                <span className="text-muted-foreground">CPU: </span>
                <span className="font-medium" data-testid="status-cpu">45%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="text-purple-400 w-4 h-4" />
                <span className="text-muted-foreground">Index: </span>
                <span className="font-medium" data-testid="status-index">Ready</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Last updated: 2 minutes ago</span>
              <Button size="sm" variant="outline" data-testid="button-refresh-status">
                Refresh Status
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
