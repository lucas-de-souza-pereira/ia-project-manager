import { apiFetch } from "./client";
import { type AssignedTask } from "@/types/task";
import { type ProjectWithTasks } from "@/types/project";

export async function getAssignedTasks(token: string) {
  const res = await apiFetch<{ data: { tasks: AssignedTask[] } }>(
    "/dashboard/assigned-tasks",
    { token },
  );

  return res.data.tasks;
}

export async function getAssignedProjectsWithTasks(token: string) {
  const res = await apiFetch<{ data: { projects: ProjectWithTasks[] } }>(
    "/dashboard/projects-with-tasks",
    { token },
  );

  return res.data.projects;
}
