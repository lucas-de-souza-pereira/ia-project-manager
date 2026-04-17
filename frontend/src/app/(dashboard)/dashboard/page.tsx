import DashboardView from "@/components/features/dashboard/dashboard-view";
import { getToken } from "@/lib/auth/session";
import { getAssignedTasks } from "@/lib/api/dashboard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de bord",
};

export default async function DashboardPage() {
  const token = await getToken();
  const rawTasks = await getAssignedTasks(token as string);

  const priorityWeight = {
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  };

  const statusWeight = {
    IN_PROGRESS: 3,
    TODO: 2,
    DONE: 1,
  };

  const formatedTasks = rawTasks
    .map((task) => ({
      ...task,
      commentsCount: task.comments ? task.comments.length : 0,
    }))
    .sort((a, b) => {
      if (statusWeight[b.status] !== statusWeight[a.status]) {
        return statusWeight[b.status] - statusWeight[a.status];
      }
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    });
  return (
    <div>
      <DashboardView tasks={formatedTasks} />
    </div>
  );
}
