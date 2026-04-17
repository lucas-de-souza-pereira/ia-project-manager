"use client";

import { useTransition } from "react";
import { logoutAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      size="lg"
      className="min-w-[150px] text-base font-normal"
      aria-label={isPending ? "Déconnexion en cours..." : "Se déconnecter"}
    >
      {isPending ? "En cours..." : "Déconnexion"}
    </Button>
  );
}
