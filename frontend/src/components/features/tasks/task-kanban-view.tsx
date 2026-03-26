import { Badge } from "@/components/ui/badge";
import DashboardTaskCard from "./dashboard-task-card";
import { type Task } from "@/types/task";

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  status: Task["status"];
}

function KanbanColumn({ title, tasks, status }: KanbanColumnProps) {
  const filteredTasks = tasks.filter((t) => t.status === status);

  return (
    <div className="w-full flex-1 md:overflow-x-auto md:bg-card md:rounded-lg md:border md:border-border p-1.5 md:p-6 py-3.5 md:py-10">
      <div className="flex flex-row gap-x-2 items-center">
        <h3 className="text-lg">{title}</h3>
        <Badge variant="counter" className="h-6.25">
          {filteredTasks.length}
        </Badge>
      </div>

      <div className="flex flex-col gap-y-3.25 md:gap-y-4.5 md:flex-row md:gap-x-4.5 xl:flex-col xl:gap-y-4.5 mt-4.5 md:mt-10.25">
        {filteredTasks.map((task, index) => (
          <div key={index} className=" md:w-[280px] shrink-0 xl:w-full">
            <DashboardTaskCard task={task} variant="kanban" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TaskKanbanView({ tasks }: { tasks: Task[] }) {
  return (
    <div className="flex flex-col gap-y-4.5 xl:flex-row gap-x-5.5">
      <KanbanColumn title="À faire" tasks={tasks} status="todo" />
      <KanbanColumn title="En cours" tasks={tasks} status="doing" />
      <KanbanColumn title="Terminé" tasks={tasks} status="done" />
    </div>
  );
}
