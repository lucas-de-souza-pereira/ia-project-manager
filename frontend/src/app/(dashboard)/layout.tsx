import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/nav/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden">
      <header className="w-full shrink-0 border-b bg-white">
        <Navbar />
      </header>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
