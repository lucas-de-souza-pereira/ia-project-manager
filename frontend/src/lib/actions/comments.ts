"use server";

import { apiFetch } from "@/lib/api/client";
import { API_ROUTES } from "@/config/api";
import { revalidatePath } from "next/cache";
import { CommentCreateInput } from "@/types/comment";
import { ActionResult } from "@/types/actions";
import { cookies } from "next/headers";

export async function addCommentAction(
  comment: CommentCreateInput,
): Promise<ActionResult<Comment>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Vous n'êtes pas authentifié." };
    }

    const result = await apiFetch<{
      success: boolean;
      message: string;
      data: { comment: Comment };
    }>(API_ROUTES.COMMENTS.CREATE(comment.projectId, comment.taskId), {
      method: "POST",
      token: token,
      body: JSON.stringify({ content: comment.content }),
    });

    revalidatePath(`/projects/${comment.projectId}/tasks/${comment.taskId}`);
    revalidatePath(`/projects/${comment.projectId}`);
    revalidatePath("/projects");
    revalidatePath("/dashboard");

    return { success: true, data: result.data.comment };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Erreur lors de l'ajout du commentaire";
    return { success: false, error: message };
  }
}
