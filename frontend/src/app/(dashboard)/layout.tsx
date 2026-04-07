import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/nav/navbar";
import { AuthProvider } from "@/contexts/auth-context";
import { requireSession } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireSession();

  return (
    <AuthProvider user={user}>
      <div className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden">
        <header className="w-full shrink-0 border-b bg-white">
          <Navbar />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </AuthProvider>
  );
}
