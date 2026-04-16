"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

// Composants features
import ProjectTasksCard from "../tasks/project-tasks-card";

import { UserChip } from "@/components/shared/user-chip";
import { KanbanColumn } from "@/components/shared/kanban-column";
import { Chips } from "@/components/shared/chips";
import ProjectTasksCalendar from "../tasks/project-tasks-calendar";
import { TaskFilters } from "../tasks/task-filters";
import ProjectHeader from "@/components/features/projects/project-header";
import ProjectContributor from "@/components/features/projects/project-contributor";

// Composants UI Shadcn
import { Button, buttonVariants } from "@/components/ui/button";

// icons
import { SquareCheck, Calendar, ArrowLeft, Star } from "@/components/icons";

// types et actions
import { type User } from "@/types/user";
import { type ProjectWithTasks } from "@/types/project";
import { deleteProjectAction } from "@/lib/actions/projects";

export default function ProjectDetailView({
  project,
  currentUser,
}: {
  project: ProjectWithTasks;
  currentUser: User;
}) {
  const router = useRouter();

  const [view, setView] = useState<"list" | "calendar">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const allTeamMembers = [
    { member: project.owner, role: "ADMIN" },
    ...project.members
      .filter((m) => m.user.id !== project.owner.id)
      .map((m) => ({ member: m.user, role: m.role })),
  ];
  const projectMember = allTeamMembers.map((m) => m.member);
  const otherTeamMembers = allTeamMembers.filter(
    ({ member }) => member.id !== currentUser.id,
  );

  const isOwner = currentUser.id === project.owner.id;

  const filteredTasks = useMemo(() => {
    return project.tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [project.tasks, searchQuery, statusFilter]);

  const handleDeleteProject = async () => {
    const res = await deleteProjectAction(project.id);
    if (res && !res.success) {
      alert(res.error);
    }
  };

  return (
    <div className="max-w-[1215px] mx-auto mt-19.5 w-full flex flex-col">
      <ProjectHeader
        project={project}
        currentUser={currentUser}
        isOwner={isOwner}
        projectMember={projectMember}
        handleDeleteProject={handleDeleteProject}
      />

      <div className="mt-12.5">
        <ProjectContributor
          project={project}
          currentUser={currentUser}
          allTeamMembers={allTeamMembers}
          otherTeamMembers={otherTeamMembers}
        />
      </div>

      <section className="w-full pb-10 mt-10" aria-labelledby="project-tasks">
        <div className="mt-0 md:bg-card md:rounded-lg md:border md:border-border p-1.5 md:p-14.75">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-6">
            <div className="flex flex-col gap-y-1">
              <h2 id="project-tasks" className="text-xl font-semibold">
                Tâches
              </h2>
              <p className="text-sm text-muted-foreground">
                Par ordre de priorité
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-x-1">
                <Chips
                  icon={<SquareCheck className="w-4 h-4" />}
                  label="Liste"
                  isActive={view === "list"}
                  onClick={() => {
                    setView("list");
                  }}
                />
                <Chips
                  icon={<Calendar className="w-4 h-4" />}
                  label="Calendrier"
                  isActive={view === "calendar"}
                  onClick={() => {
                    setView("calendar");
                  }}
                />
              </div>

              <TaskFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
              />
            </div>
          </div>

          {view === "list" ? (
            <div className="mt-10 flex flex-col gap-y-4.5">
              {filteredTasks.map((task) => (
                <ProjectTasksCard
                  key={task.id}
                  task={task}
                  currentUser={currentUser}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5 md:mt-8 xl:mt-12.5 w-11/12 mx-auto flex flex-col gap-y-4.5 xl:flex-row gap-x-5.5">
              <ProjectTasksCalendar
                tasks={filteredTasks}
                currentUser={currentUser}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
