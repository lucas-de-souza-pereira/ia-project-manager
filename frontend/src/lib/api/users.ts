import { cookies } from "next/headers";
import { apiFetch } from "./client";
import { User } from "@/types/user";

export async function getUsers() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return { success: false, error: "Vous n'êtes pas authentifié." };
  }

  const result = await apiFetch<{
    success: boolean;
    message: string;
    data: { users: User[] };
  }>(`/users`, {
    method: "GET",
    token: token,
  });

  return { success: true, data: result.data.users };
}
