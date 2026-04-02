import { apiFetch } from "./client";
import { type Project, type ProjectWithTasks } from "@/types/project";
import { type Task } from "@/types/task";

export async function getProjects(token: string) {
  const res = await apiFetch<{ data: { projects: Project[] } }>("/projects", {
    token,
  });

  return res.data.projects;
}

export async function getTasksByProjectId(token: string, id: string) {
  const res = await apiFetch<{ data: { tasks: Task[] } }>(
    `/projects/${id}/tasks`,
    {
      token,
    },
  );

  return res.data.tasks;
}

export async function getProjectById(token: string, id: string) {
  const res = await apiFetch<{ data: { project: ProjectWithTasks } }>(
    `/projects/${id}`,
    {
      token,
    },
  );

  return res.data.project;
}
