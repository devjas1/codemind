import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Circle, Download } from "lucide-react";
import { useState } from "react";

const navigationItems = [
  { id: "overview", label: "Overview", icon: "fas fa-home" },
  { id: "modules", label: "Modules", icon: "fas fa-cube" },
  { id: "configuration", label: "Configuration", icon: "fas fa-cog" },
  { id: "commands", label: "CLI Commands", icon: "fas fa-terminal" },
  { id: "deployment", label: "Deployment", icon: "fas fa-rocket" },
];

const quickActions = [
  { label: "Initialize Project", icon: "fas fa-play" },
  { label: "Download Models", icon: "fas fa-download" },
  { label: "Run Tests", icon: "fas fa-test-tube" },
];

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  return (
    <aside className="space-y-4 sticky top-24">
      <Card className="p-4 border-border bg-card">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
          Project Setup
        </h3>
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary"
                }`}
                data-testid={`nav-${item.id}`}
              >
                <i className={`${item.icon} w-4`}></i>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-4 border-border bg-card">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
          Quick Actions
        </h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="secondary"
              className="w-full justify-start text-left"
              data-testid={`action-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <i className={`${action.icon} mr-2`}></i>
              {action.label}
            </Button>
          ))}
        </div>
      </Card>
    </aside>
  );
}
