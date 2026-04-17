"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";
import { ActionResult } from "@/types/actions";
import { API_ROUTES } from "@/config/api";

export type AIGeneratedTask = {
  title: string;
  description: string;
};

export async function generateTasksAIAction(
  projectId: string,
  prompt: string
): Promise<ActionResult<AIGeneratedTask[]>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Vous n'êtes pas authentifié." };
    }

    const result = await apiFetch<{
      success: boolean;
      message: string;
      data: { tasks: AIGeneratedTask[] };
    }>(API_ROUTES.TASKS.GENERATE(projectId), {
      method: "POST",
      body: JSON.stringify({ prompt }),
      token: token,
    });

    return { success: true, data: result.data.tasks };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur lors de la génération avec l'IA. Vérifiez que votre API clée est valide.";
    return { success: false, error: message };
  }
}
