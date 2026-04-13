"use client";

import { useState } from "react";
import { Chips } from "@/components/shared/chips";
import TaskListView from "@/components/features/dashboard/task-list-view";
import { KanbanColumn } from "@/components/shared/kanban-column";
import { Button } from "@/components/ui/button";
import { SquareCheck, Calendar } from "@/components/icons";
import { useAuth } from "@/contexts/auth-context";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { type AssignedTask } from "@/types/task";
import DashboardTaskCard from "../tasks/dashboard-task-card";
import { KANBAN_COLUMNS } from "@/config/task-status";


interface DashboardViewProps {
  tasks: AssignedTask[];
}

export default function DashboardView({ tasks }: DashboardViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useAuth();
  const [view, setView] = useState<"list" | "kanban">("list");

  const handleOpenCreateProjectModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "create-project");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mt-8 md:mt-12 xl:mt-22">
      <div className="w-10/12 xl:w-[1215px] mx-auto">
        <div className="flex flex-col gap-y-4.5 md:flex-row items-center justify-between ">
          <div className="flex flex-col gap-y-3.5">
            <h1>Tableau de bord</h1>
            <p className="text-lg text-foreground">
              Bonjour {user?.name}, voici un aperçu de vos projets et tâches
            </p>
          </div>

          <Button
            variant="default"
            size="lg"
            onClick={handleOpenCreateProjectModal}
          >
            + Créer un projet
          </Button>
        </div>

        <div className="mt-8 md:mt-12 xl:mt-15 flex flew-row gap-x-2.5 pl-1.25">
          <Chips
            icon={<SquareCheck className="w-4 h-4" />}
            label="Liste"
            isActive={view === "list"}
            onClick={() => setView("list")}
          />
          <Chips
            icon={<Calendar className="w-4 h-4" />}
            label="Kanban"
            isActive={view === "kanban"}
            onClick={() => setView("kanban")}
          />
        </div>
      </div>
      {view === "list" ? (
        <div className="mt-3 md:mt-4 xl:mt-5 w-11/12 xl:w-[1215px] mx-auto">
          <TaskListView tasks={tasks} />
        </div>
      ) : (
        <div className="mt-5 md:mt-8 xl:mt-12.5 max-w-[1440px] w-full mx-auto flex flex-col gap-y-4.5 xl:flex-row gap-x-5.5">
          {KANBAN_COLUMNS.map((column) => (
            <KanbanColumn
              key={column.status}
              title={column.title}
              tasks={tasks}
              status={column.status}
              renderCard={(task) => (
                <DashboardTaskCard
                  key={task.id}
                  task={task}
                  variant="kanban"
                />
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
