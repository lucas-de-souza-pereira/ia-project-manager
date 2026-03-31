import DashboardView from "@/components/features/tasks/dashboard-view";
import { type AssignedTask } from "@/types/task";
import { getToken } from "@/lib/auth/session";
import { apiFetch } from "@/lib/api/client";

export default async function DashboardPage() {
  const token = await getToken();

  const res = await apiFetch<{ data: { tasks: AssignedTask[] } }>(
    "/dashboard/assigned-tasks",
    {
      token: token as string,
    },
  );

  const priorityWeight = {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  };

  const formatedTasks = res.data.tasks
    .map((task) => ({
      ...task,
      commentsCount: task.comments ? task.comments.length : 0,
    }))
    .sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
  return (
    <div>
      <DashboardView tasks={formatedTasks} />
    </div>
  );
}
