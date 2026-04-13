"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Composants features
import ProjectTasksCard from "../tasks/project-tasks-card";
import { CreateTaskModal } from "../tasks/modals/create-task-modal";
import { UpdateTaskModal } from "../tasks/modals/update-tasks-modal";
import { UpdateProjectModal } from "./modals/update-project-modal";
import { UserChip } from "@/components/shared/user-chip";
import { KanbanColumn } from "@/components/shared/kanban-column";
import { Chips } from "@/components/shared/chips";

// Composants UI Shadcn
import { Button } from "@/components/ui/button";

// icons
import { SquareCheck, Calendar, ArrowLeft, Star } from "@/components/icons";

// types et actions
import { type User } from "@/types/user";
import { type ProjectWithTasks } from "@/types/project";
import { deleteProjectAction } from "@/lib/actions/projects";
import { KANBAN_COLUMNS } from "@/config/task-status";

export default function ProjectDetailView({
  project,
  currentUser,
}: {
  project: ProjectWithTasks;
  currentUser: User;
}) {
  const router = useRouter();
  
  const [view, setView] = useState<"list" | "kanban">("list");
  
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
    <div className="mt-19.5">
      <div className="flex items-center justify-between pl-11 pr-[113px]">
        <div className="flex gap-x-3 ">
          <Button
            variant="ghost"
            className="bg-white rounded-lg border-border"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-3.75" />
          </Button>

        <div className="flex gap-x-3.5">
          <div className="flex flex-col gap-y-3.5">
            <h1>{project.name}</h1>
            <p className="text-lg/4.5">{project.description}</p>
          </div>
          {isOwner && <Link href="?modal=update-project">Modifier</Link>}
          {isOwner && (
            <Button variant="outline" onClick={() => handleDeleteProject()}>
              Supprimer
            </Button>
          )}
        </div>
        </div>

        <div className="flex gap-x-2">
          <Link
            href="?modal=create-task"
            className="inline-flex h-[50px] items-center justify-center gap-2 rounded-lg bg-primary-button hover:bg-primary-button-hover px-4 text-base font-normal text-primary-foreground transition-colors duration-300"
          >
            + Ajouter une tâche
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

          <Button variant="default" size="lg" className="bg-primary hover:bg-primary-foreground hover:text-primary hover:border-primary">
            <Star className="w-5.25 h-5.25"/>
            IA
          </Button>
        </div>
      </div>

      <div className="flex mt-15 bg-[#F3F4F6] py-5 px-12.5 items-center justify-between">
        <div className="flex gap-2">
          <h2>Contributeurs</h2>
          <p>{allTeamMembers.length} personnes</p>
        </div>
        <div className="flex gap-2">
          <UserChip
            user={currentUser}
            currentUserId={currentUser.id}
            ownerId={project.owner.id}
            variant="role"
          />
          <div className="flex items-center gap-2">
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

      <div className="mt-8.5 md:bg-card md:rounded-lg md:border md:border-border p-1.5 md:p-14.75">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h2>Tâches</h2>
            <p>Par ordre de priorité</p>
          </div>

          <div className="flex gap-2">
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
              label="Kanban"
              isActive={view === "kanban"}
              onClick={() => {
                setView("kanban");
              }}
            />
            <p>Trier par</p>
            <p>input recherche</p>
          </div>
        </div>
      
 {view === "list" ?
         (
      <div className="mt-10 flex flex-col gap-y-4.5">
          {project.tasks.map((task) => (
            <ProjectTasksCard
              key={task.id}
              task={task}
              currentUser={currentUser}
              />

          ))
        }
         </div>
        ) : (
         
          <div className="mt-5 md:mt-8 xl:mt-12.5 w-11/12 mx-auto flex flex-col gap-y-4.5 xl:flex-row gap-x-5.5">
            {KANBAN_COLUMNS.map((column) => (
              <KanbanColumn
                key={column.status}
                title={column.title}
                tasks={project.tasks}
                status={column.status}
                renderCard={(task) => (
                  <ProjectTasksCard
                    key={task.id}
                    task={task}
                    currentUser={currentUser}
                  />
                )}
              />
            ))}
          </div>
        )}
     
    </div>
    </div>
  );
}
