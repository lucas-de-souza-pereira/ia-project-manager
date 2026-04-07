"use client";

import { useTransition } from "react";
import { logoutAction } from "@/lib/auth/actions";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
      aria-label="Se déconnecter"
    >
      {isPending ? "…" : "Déconnexion"}
    </button>
  );
}
