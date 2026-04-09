import { ActionResult } from "@/types/actions";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { apiFetch } from "./client";
import { API_ROUTES } from "@/config/api";

export async function getProfile(): Promise<ActionResult<User>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return { success: false, error: "Vous n'êtes pas authentifié." };
  }

  const result = await apiFetch<{
    success: boolean;
    message: string;
    data: { user: User };
  }>(API_ROUTES.AUTH.PROFILE, {
    method: "GET",
    token: token,
  });

  return { success: true, data: result.data.user };
}
