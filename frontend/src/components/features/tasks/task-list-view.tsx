import DashboardTaskCard from "./dashboard-task-card";
import { type AssignedTask } from "@/types/task";

export default function TaskListView({ tasks }: { tasks: AssignedTask[] }) {
  return (
    <div className="md:bg-card md:rounded-lg md:border md:border-border p-1.5 md:p-14.75">
      <div className="flex flex-col gap-y-4.5 items-start md:flex-row md:items-center justify-between">
        <div className="flex flex-col items-start gap-y-2 mt-2 md:mt-0">
          <h2>Mes tâches assignées</h2>
          <p>Par ordre de priorité</p>
        </div>
        <input type="text" placeholder="Rechercher" />
      </div>

      <div className="flex flex-col gap-y-3.25 md:gap-y-4.25 mt-4.5 md:mt-6 lg:mt-10">
        {tasks.map((task) => (
          <DashboardTaskCard key={task.id} task={task} variant="list" />
        ))}
      </div>
    </div>
  );
}
