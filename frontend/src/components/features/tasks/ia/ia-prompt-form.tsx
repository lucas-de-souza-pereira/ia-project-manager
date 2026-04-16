"use client";

import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Star } from "@/components/icons";

interface IAPromptFormProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isLoading: boolean;
  disabled: boolean;
}

export function IAPromptForm({
  prompt,
  setPrompt,
  onSubmit,
  isLoading,
  disabled,
}: IAPromptFormProps) {
  return (
    <div className="w-full flex-none pt-2">
      <form onSubmit={onSubmit} className="relative flex items-center w-full">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={disabled || isLoading}
          placeholder="Décrivez les tâches que vous souhaitez ajouter..."
          className="w-full"
          // className={cn(
          //   "w-full h-15 sm:h-14 pl-5 pr-12 rounded-full bg-background border-none text-xs md:text-xs",
          //   "placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary/20",
          // )}
        />
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading || disabled}
          className="absolute right-8 w-6 h-6 flex items-center justify-center rounded-full bg-[#E55B13] hover:bg-[#c94b0f] text-white disabled:opacity-50 transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Star className="w-2.5 h-2.5" fill="currentColor" />
          )}
        </button>
      </form>
    </div>
  );
}
