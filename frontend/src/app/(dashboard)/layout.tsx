import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/nav/navbar";
import { AuthProvider } from "@/contexts/auth-context";
import { requireSession } from "@/lib/auth/session";
import { Footer } from "@/components/layout/footer/footer";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireSession();

  return (
    <AuthProvider user={user}>
      <div className="flex flex-col min-h-screen w-full bg-slate-50">
        <header className="w-full shrink-0 border-b bg-white">
          <Navbar />
        </header>
        <main className="flex-1 pb-19">{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
