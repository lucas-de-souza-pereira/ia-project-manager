"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Composants features
import ProjectTasksCard from "../tasks/project-tasks-card";
import { CreateTaskModal } from "../tasks/modals/create-task-modal";
import { UpdateTaskModal } from "../tasks/modals/update-tasks-modal";
import { ManageTaskIAModal } from "../tasks/modals/manage-task-ia-modal";
import { UpdateProjectModal } from "./modals/update-project-modal";
import { UserChip } from "@/components/shared/user-chip";
import { KanbanColumn } from "@/components/shared/kanban-column";
import { Chips } from "@/components/shared/chips";
import ProjectTasksCalendar from "../tasks/project-tasks-calendar";

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

  const handleDeleteProject = async () => {
    const res = await deleteProjectAction(project.id);
    if (res && !res.success) {
      alert(res.error);
    }
  };

  return (
    <div className="mt-19.5 w-full flex flex-col">
      <div className="max-w-[1215px] mx-auto w-full relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-y-6">
          <div className="flex items-start gap-x-6 xl:gap-x-0">
            <Button
              variant="ghost"
              className="bg-white rounded-xl border border-border shrink-0 size-[57px] shadow-sm p-0 flex items-center justify-center mt-1 xl:mt-0 xl:absolute xl:-left-[73px]"
              onClick={() => router.back()}
            >
              <ArrowLeft className="size-5 text-muted-foreground" />
            </Button>

            <div className="flex flex-col">
              <div className="flex items-center flex-wrap gap-x-3">
                <h1 className="text-2xl font-semibold">{project.name}</h1>
                <div className="flex items-center gap-x-3">
                  {isOwner && (
                    <Link
                      href="?modal=update-project"
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "p-0 h-auto font-normal underline text-sm",
                      )}
                    >
                      Modifier
                    </Link>
                  )}
                  {isOwner && (
                    <Button
                      variant="link"
                      className="text-primary underline text-sm p-0 h-auto font-normal"
                      onClick={() => handleDeleteProject()}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground mt-1 max-w-[800px]">
                {project.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-x-2 shrink-0">
            <Link
              href="?modal=create-task"
              className="inline-flex h-[50px] items-center justify-center gap-2 rounded-lg bg-primary-button hover:bg-primary-button-hover px-4 text-base font-normal text-primary-foreground transition-colors duration-300"
            >
              Créer une tâche
            </Link>
            <CreateTaskModal projectMember={projectMember} />

            <UpdateTaskModal
              tasks={project.tasks}
              projectMember={projectMember}
            />

            <UpdateProjectModal
              project={project}
              currentUser={currentUser}
              projectMember={projectMember}
            />

            <ManageTaskIAModal />

            <Link
              href="?modal=task-ia"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "bg-primary hover:bg-primary-foreground hover:text-primary border hover:border-primary shrink-0 gap-x-2",
              )}
            >
              <Star className="w-5.25 h-5.25" />
              IA
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1215px] mx-auto w-full">
        <div className="flex flex-col sm:flex-row py-5 px-8 sm:items-center justify-between gap-y-4">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">Contributeurs</h2>
            <p className="text-sm text-muted-foreground">
              {allTeamMembers.length} personnes
            </p>
          </div>
          <div className="flex items-center gap-x-2 flex-wrap">
            <UserChip
              user={currentUser}
              currentUserId={currentUser.id}
              ownerId={project.owner.id}
              variant="role"
            />
            <div className="flex items-center gap-x-2">
              {otherTeamMembers.map((item) => (
                <UserChip
                  key={item.member.id}
                  user={item.member}
                  currentUserId={currentUser.id}
                  ownerId={project.owner.id}
                  variant="name"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1215px] mx-auto w-full pb-10 mt-10">
        <div className="mt-0 md:bg-card md:rounded-lg md:border md:border-border p-1.5 md:p-14.75">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-6">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-xl font-semibold">Tâches</h2>
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

              <div className="flex items-center gap-x-4 ml-auto sm:ml-0">
                <p className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  Trier par
                </p>
                <div className="h-8 bg-border hidden sm:block" />
                <p className="text-sm text-muted-foreground">input recherche</p>
              </div>
            </div>
          </div>

          {view === "list" ? (
            <div className="mt-10 flex flex-col gap-y-4.5">
              {project.tasks.map((task) => (
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
                tasks={project.tasks}
                currentUser={currentUser}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
