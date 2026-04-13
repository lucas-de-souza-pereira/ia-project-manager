import { cookies } from "next/headers";
import type { User } from "@/types/user";
import { apiFetch } from "@/lib/api/client";

const COOKIE_NAME = "auth_token";

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function getSession(): Promise<User | null> {
  const token = await getToken();
  if (!token) return null;

  try {
    const res = await apiFetch<{ success: boolean; data: { user: User } }>(
      "/auth/profile",
      { token },
    );
    return res.data.user;
  } catch (error) {
    if ((error as any)?.digest?.includes("NEXT_REDIRECT")) {
      throw error;
    }
    return null;
  }
}

export async function requireSession(): Promise<User> {
  const user = await getSession();
  if (!user) {
    const { redirect } = await import("next/navigation");
    redirect("/login");
  }
  return user as User;
}
