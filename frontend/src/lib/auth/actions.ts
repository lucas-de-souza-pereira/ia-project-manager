"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api/client";
import { User } from "@/types/auth";
import { ActionResult } from "@/types/actions";

const COOKIE_NAME = "auth_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

interface AuthApiResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export async function loginAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await apiFetch<AuthApiResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, res.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Une erreur est survenue. Veuillez réessayer.";
    return { success: false, error: message };
  }

  redirect("/dashboard");
}

export async function registerAction(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string | null;

  try {
    const res = await apiFetch<AuthApiResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name: name || undefined }),
    });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, res.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Une erreur est survenue. Veuillez réessayer.";
    return { success: false, error: message };
  }

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/login");
}
