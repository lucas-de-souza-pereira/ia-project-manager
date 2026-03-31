import { apiFetch } from "./client";
import { type AssignedTask } from "@/types/task";

export async function getAssignedTasks(token: string) {
  const res = await apiFetch<{ data: { tasks: AssignedTask[] } }>(
    "/dashboard/assigned-tasks",
    { token },
  );

  return res.data.tasks;
}
