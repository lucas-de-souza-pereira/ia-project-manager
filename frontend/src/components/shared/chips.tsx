"use client";

import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface ChipsProps extends ComponentProps<typeof Button> {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
}

export function Chips({ icon, label, isActive = false, ...props }: ChipsProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      {...props}
      className={cn(
        "px-4 py-3.5 flex items-center gap-3.5 rounded-md transition-colors duration-300",
        isActive
          ? "bg-primary-light text-primary"
          : "bg-primary-foreground text-primary hover:bg-primary-light hover:text-primary",
      )}
    >
      <div className="shrink-0" aria-hidden="true">
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </Button>
  );
}
