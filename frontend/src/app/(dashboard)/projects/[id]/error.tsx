"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 mb-8 rounded-full bg-destructive/10 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-destructive"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h1 className="text-3xl font-semibold mb-3 tracking-tight">
        Oups ! Une erreur est survenue
      </h1>

      <p className="max-w-md text-muted-foreground mb-10 leading-relaxed">
        {error.message ||
          "Nous n'avons pas pu charger les détails de ce projet. Il est possible qu'il n'existe plus ou que vous n'ayez pas les permissions nécessaires."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="default"
          size="lg"
          onClick={() => reset()}
          className="min-w-[180px]"
        >
          Réessayer
        </Button>

        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "w-70",
          )}
        >
          Retour au tableau de bord
        </Link>
      </div>

      {error.digest && (
        <p className="mt-8 text-xs text-muted-foreground/50 font-mono">
          ID de l'erreur : {error.digest}
        </p>
      )}
    </div>
  );
}
