"use client";

import { Logo } from "@/components/icons";

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full animate-in fade-in duration-500">
      <div className="relative">
        <Logo className="w-48 h-auto text-primary animate-pulse" />
        <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl animate-pulse -z-10" />
      </div>
      <p className="mt-8 text-muted-foreground font-medium animate-bounce">
        Préparation de votre espace...
      </p>
    </div>
  );
}
