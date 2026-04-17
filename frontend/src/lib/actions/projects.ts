"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api/client";
import { ActionResult } from "@/types/actions";
import { CreateProjectData, Project } from "@/types/project";
import { API_ROUTES } from "@/config/api";
import { redirect } from "next/navigation";

export async function createProjectAction(
  data: CreateProjectData,
): Promise<ActionResult<Project>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Vous n'êtes pas authentifié." };
    }
    const result = await apiFetch<{
      success: boolean;
      message: string;
      data: { project: Project };
    }>(API_ROUTES.PROJECTS.BASE, {
      method: "POST",
      body: JSON.stringify(data),
      token: token,
    });
    revalidatePath("/projects");
    revalidatePath("/dashboard");
    console.log("result", result);
    console.log("result.data.project", result.data.project);
    return { success: true, data: result.data.project };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur lors de la création";
    return { success: false, error: message };
  }
}

export async function updateProjectAction(
  projectId: string,
  data: CreateProjectData,
): Promise<ActionResult<Project>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Vous n'êtes pas authentifié." };
    }

    const result = await apiFetch<{
      success: boolean;
      message: string;
      data: { project: Project };
    }>(API_ROUTES.PROJECTS.DETAIL(projectId), {
      method: "PUT",
      body: JSON.stringify(data),
      token: token,
    });

    revalidatePath(`/projects/${projectId}`);

    return { success: true, data: result.data.project };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur lors de la modification";
    return { success: false, error: message };
  }
}

export async function deleteProjectAction(
  projectId: string,
): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Vous n'êtes pas authentifié." };
    }

    await apiFetch(API_ROUTES.PROJECTS.DETAIL(projectId), {
      method: "DELETE",
      token: token,
    });

    revalidatePath("/projects");
    revalidatePath("/dashboard");
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur lors de la suppression";
    return { success: false, error: message };
  }

  redirect("/projects");
}

export async function addContributorToProjectAction(
  projectId: string,
  email: string,
): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Vous n'êtes pas authentifié." };
    }

    await apiFetch<{
      success: boolean;
      message: string;
      data?: unknown;
    }>(API_ROUTES.PROJECTS.ADD_CONTRIBUTOR(projectId), {
      method: "POST",
      body: JSON.stringify({ email }),
      token: token,
    });

    revalidatePath(`/projects/${projectId}`);

    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Erreur lors de l'ajout du contributeur";
    return { success: false, error: message };
  }
}

export async function removeContributorFromProjectAction(
  projectId: string,
  userId: string,
): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Vous n'êtes pas authentifié." };
    }

    await apiFetch<{
      success: boolean;
      message: string;
      data?: unknown;
    }>(API_ROUTES.PROJECTS.REMOVE_CONTRIBUTOR(projectId, userId), {
      method: "DELETE",
      token: token,
    });

    revalidatePath(`/projects/${projectId}`);

    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Erreur lors de la suppression du contributeur";
    return { success: false, error: message };
  }
}
