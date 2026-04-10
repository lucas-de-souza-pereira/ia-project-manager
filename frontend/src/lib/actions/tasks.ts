"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { apiFetch } from "@/lib/api/client";
import { CreateTaskData, Task } from "@/types/task";
import { ActionResult } from "@/types/actions";
import { parse, isValid } from "date-fns";
import { API_ROUTES } from "@/config/api";

export async function createTaskAction(
  projectId: string,
  data: CreateTaskData,
): Promise<ActionResult<Task>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Vous n'êtes pas authentifié." };
    }

    const parsedDate = parse(data.dueDate, "dd/MM/yyyy", new Date());

    const isoDate = isValid(parsedDate) ? parsedDate.toISOString() : undefined;
    const backendData = {
      ...data,
      dueDate: isoDate,
    };

    const result = await apiFetch<{
      success: boolean;
      message: string;
      data: { task: Task };
    }>(API_ROUTES.TASKS.LIST(projectId), {
      method: "POST",
      body: JSON.stringify(backendData),
      token: token,
    });

    revalidatePath(`/projects/${projectId}`);

    return { success: true, data: result.data.task };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur lors de la création";
    return { success: false, error: message };
  }
}

export async function updateTaskAction(
  projectId: string,
  taskId: string,
  data: CreateTaskData,
): Promise<ActionResult<Task>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Vous n'êtes pas authentifié." };
    }

    const parsedDate = parse(data.dueDate, "dd/MM/yyyy", new Date());

    const isoDate = isValid(parsedDate) ? parsedDate.toISOString() : undefined;
    const backendData = {
      ...data,
      dueDate: isoDate,
    };

    const result = await apiFetch<{
      success: boolean;
      message: string;
      data: { task: Task };
    }>(API_ROUTES.TASKS.DETAIL(projectId, taskId), {
      method: "PUT",
      body: JSON.stringify(backendData),
      token: token,
    });

    revalidatePath(`/projects/${projectId}`);

    return { success: true, data: result.data.task };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur lors de la modification";
    return { success: false, error: message };
  }
}

export async function deleteTaskAction(
  projectId: string,
  taskId: string,
): Promise<ActionResult<Task>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { success: false, error: "Vous n'êtes pas authentifié." };
    }

    const result = await apiFetch<{
      success: boolean;
      message: string;
      data: { task: Task };
    }>(API_ROUTES.TASKS.DETAIL(projectId, taskId), {
      method: "DELETE",
      token: token,
    });

    revalidatePath(`/projects/${projectId}`);

    return { success: true, data: result.data.task };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erreur lors de la suppression";
    return { success: false, error: message };
  }
}
