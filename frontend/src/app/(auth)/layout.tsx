import type { ReactNode } from "react";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getSession();

  if (user) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
