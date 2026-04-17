"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/shared/states/error-state";

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
    <div className="flex-1 flex items-center justify-center p-6 min-h-[70vh]">
      <ErrorState
        error={error}
        reset={reset}
        message="Nous n'avons pas pu charger les détails de ce projet. Il est possible qu'il n'existe plus ou que vous n'ayez pas les permissions nécessaires."
      >
        <Button
          render={<Link href="/dashboard" />}
          variant="outline"
          className="px-8 py-6 h-auto text-base rounded-xl flex items-center gap-2 border-primary text-primary hover:bg-primary/5 hover:text-primary transition-all"
        >
          <Home className="w-5 h-5" />
          Retour au Tableau de bord
        </Button>
      </ErrorState>
    </div>
  );
}
