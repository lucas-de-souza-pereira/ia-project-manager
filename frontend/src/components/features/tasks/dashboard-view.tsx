import { Chips } from "@/components/shared/chips";
import TaskListView from "./task-list-view";
import { Button } from "@/components/ui/button";
import { SquareCheck, Calendar } from "@/components/icons";

interface DashboardViewProps {
  user: { name: string };
}

export default function DashboardView({ user }: DashboardViewProps) {
  return (
    <div>
      <div className="flex flex-col gap-y-4.5 md:flex-row items-center justify-between">
        <div className="flex flex-col gap-y-3.5">
          <h1>Tableau de bord</h1>
          <p className="text-lg">
            Bonjour {user.name}, voici un aperçu de vos projets et tâches
          </p>
        </div>

        <Button variant="default" size="lg">
          + Créer un projet
        </Button>
      </div>

      <div className="mt-8 md:mt-12 xl:mt-15 flex flew-row gap-x-2.5">
        <Chips icon={<SquareCheck className="w-4 h-4" />} label="Liste" />
        <Chips icon={<Calendar className="w-4 h-4" />} label="Kanban" />
      </div>

      <div className="mt-3 md:mt-4 xl:mt-5">
        <TaskListView />
      </div>
    </div>
  );
}
