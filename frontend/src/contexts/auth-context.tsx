"use client";

import { useMemo, type ReactNode } from "react";
import { createContext, useContext } from "react";
import type { User } from "@/types/user";
import { getUserInitials } from "@/lib/utils";

interface AuthContextValue {
  user: User;
  initials: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  const initials = useMemo(() => getUserInitials(user.name), [user.name]);

  return (
    <AuthContext.Provider value={{ user, initials }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth doit être utilisé dans un <AuthProvider>");
  }
  return ctx;
}
