import { apiFetch } from "./client";
import { type Project } from "@/types/project";
import { type Task } from "@/types/task";

export async function getProjects(token: string) {
  const res = await apiFetch<{ data: { projects: Project[] } }>("/projects", {
    token,
  });

  return res.data.projects;
}

export async function getAllTasksProject(token: string, id: string) {
  const res = await apiFetch<{ data: { tasks: Task[] } }>(
    `/projects/${id}/tasks`,
    { token },
  );

  return res.data.tasks;
}
