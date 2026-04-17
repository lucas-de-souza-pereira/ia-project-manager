"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erreur interceptée par Next.js :", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[50vh] gap-y-4">
      <div className="p-4 bg-red-50 text-red-600 rounded-full text-2xl">⚠️</div>
      <h2 className="text-xl font-bold">Impossible de charger les tâches</h2>
      <p className="text-muted-foreground text-center max-w-md">
        Une erreur est survenue lors de la connexion au serveur. Cela peut venir
        de votre connexion ou d&apos;une maintenance en cours.
      </p>
      <Button onClick={() => reset()} variant="outline" className="mt-4">
        Réessayer
      </Button>
    </div>
  );
}
