"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api/client";
import { ActionResult } from "@/types/actions";
import { User, PasswordData } from "@/types/user";
import { API_ROUTES } from "@/config/api";
import { ProfileData } from "@/lib/validation/profile";

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
    }>(API_ROUTES.USERS.BASE, {
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

export async function updateProfileAction(
  values: ProfileData,
): Promise<ActionResult<User>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Vous n'êtes pas authentifié." };
    }
    const name = `${values.firstName} ${values.lastName}`;
    const backendData = {
      name: name,
      email: values.email,
    };

    const result = await apiFetch<{
      success: boolean;
      message: string;
      data: { user: User };
    }>(API_ROUTES.AUTH.PROFILE, {
      method: "PUT",
      token: token,
      body: JSON.stringify(backendData),
    });

    revalidatePath("/");
    return { success: true, data: result.data.user };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Erreur lors de la mise à jour du profil";
    return { success: false, error: message };
  }
}

export async function updatePasswordAction(
  passwordData: PasswordData,
): Promise<ActionResult<User>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Vous n'êtes pas authentifié." };
    }

    await apiFetch<{
      success: boolean;
      message: string;
      data: { user: User };
    }>(API_ROUTES.AUTH.PASSWORD, {
      method: "PUT",
      token: token,
      body: JSON.stringify(passwordData),
    });
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Erreur lors de la mise à jour du mot de passe";
    return { success: false, error: message };
  }
}
