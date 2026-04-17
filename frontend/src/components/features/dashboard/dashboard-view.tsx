"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// components shadcn
import { Button } from "@/components/ui/button";

// components features
import { Chips } from "@/components/shared/chips";
import TaskListView from "@/components/features/dashboard/task-list-view";
import { KanbanColumn } from "@/components/shared/kanban-column";
import DashboardTaskCard from "../tasks/dashboard-task-card";
import { CreateProjectModal } from "@/components/features/projects/modals/create-project-modal";

// hooks
import { useAuth } from "@/contexts/auth-context";

// config
import { KANBAN_COLUMNS } from "@/config/task-status";

// icons
import { SquareCheck, Calendar } from "@/components/icons";

// types
import { type AssignedTask } from "@/types/task";

interface DashboardViewProps {
  tasks: AssignedTask[];
}

export default function DashboardView({ tasks }: DashboardViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useAuth();
  const [view, setView] = useState<"list" | "kanban">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [tasks, searchQuery]);

  const handleOpenCreateProjectModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "create-project");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mt-8 md:mt-12 xl:mt-22">
      <div className="w-10/12 xl:w-[1215px] mx-auto">
        <div className="flex flex-col gap-y-4.5 md:flex-row items-center justify-between ">
          <div className="flex flex-col gap-y-3.5">
            <h1 id="dashboard-title">Tableau de bord</h1>
            <p className="text-lg text-foreground">
              Bonjour {user?.name}, voici un aperçu de vos projets et tâches
            </p>
          </div>

          <Button
            variant="default"
            size="lg"
            onClick={handleOpenCreateProjectModal}
            aria-label="Créer un nouveau projet"
          >
            + Créer un projet
          </Button>
        </div>

        <CreateProjectModal currentUser={user} />

        <div
          className="mt-8 md:mt-12 xl:mt-15 flex flew-row gap-x-2.5 pl-1.25"
          role="tablist"
          aria-label="Modes d'affichage du tableau de bord"
        >
          <Chips
            id="tab-list"
            role="tab"
            aria-selected={view === "list"}
            aria-controls="dashboard-content"
            icon={<SquareCheck aria-hidden="true" className="w-4 h-4" />}
            label="Liste"
            isActive={view === "list"}
            onClick={() => setView("list")}
          />
          <Chips
            id="tab-kanban"
            role="tab"
            aria-selected={view === "kanban"}
            aria-controls="dashboard-content"
            icon={<Calendar aria-hidden="true" className="w-4 h-4" />}
            label="Kanban"
            isActive={view === "kanban"}
            onClick={() => setView("kanban")}
          />
        </div>
      </div>
      <section
        id="dashboard-content"
        role="tabpanel"
        aria-labelledby={view === "list" ? "tab-list" : "tab-kanban"}
      >
        {view === "list" ? (
          <div className="mt-3 md:mt-4 xl:mt-5 w-11/12 xl:w-[1215px] mx-auto">
            <TaskListView
              tasks={filteredTasks}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        ) : (
          <div className="mt-5 md:mt-8 xl:mt-12.5 max-w-[1440px] px-3 md:px-0 w-full mx-auto flex flex-col gap-y-4.5 xl:flex-row gap-x-5.5">
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
      </section>
    </div>
  );
}
