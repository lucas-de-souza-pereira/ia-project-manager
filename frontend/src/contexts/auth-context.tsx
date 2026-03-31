"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { User } from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  initials: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  user,
  children,
}: {
  user: User | null;
  children: ReactNode;
}) {
  const initials = getUserInitials(user);

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

function getUserInitials(user: User | null): string {
  if (!user) return "?";

  if (user.name) {
    const parts = user.name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return user.name.slice(0, 2).toUpperCase();
  }

  return user.email.slice(0, 2).toUpperCase();
}
