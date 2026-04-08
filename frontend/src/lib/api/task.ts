import { apiFetch } from "./client";
import { type Task } from "@/types/task";

export async function createTask(token: string, task: Task) {
  const res = await apiFetch<{ data: { task: Task } }>("/tasks", {
    method: "POST",
    token,
    body: JSON.stringify(task),
  });

  return res.data.task;
}
