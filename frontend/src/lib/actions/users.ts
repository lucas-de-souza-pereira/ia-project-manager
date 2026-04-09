"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";
import { ActionResult } from "@/types/actions";
import { User } from "@/types/user";

export async function getUsersAction(): Promise<ActionResult<User[]>> {
  try {
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
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Erreur lors de la récupération des utilisateurs";
    return { success: false, error: message };
  }
}
