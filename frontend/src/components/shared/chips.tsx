"use client";

import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChipsProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function Chips({ icon, label, isActive = false, onClick }: ChipsProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className={cn(
        "px-4 py-3.5 flex items-center gap-3.5 rounded-md transition-colors duration-300",
        isActive
          ? "bg-primary-light text-primary"
          : "bg-primary-foreground text-primary hover:bg-primary-light hover:text-primary",
      )}
    >
      <div className="shrink-0">{icon}</div>
      <span className="text-sm">{label}</span>
    </Button>
  );
}
