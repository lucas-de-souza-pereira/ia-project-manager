"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// Composants features
import ProjectTasksCard from "../tasks/project-tasks-card";
import { CreateTaskModal } from "../tasks/modals/create-task-modal";
import { UpdateTaskModal } from "../tasks/modals/update-tasks-modal";
import { UpdateProjectModal } from "./modals/update-project-modal";
import { UserChip } from "@/components/shared/user-chip";

// Composants UI Shadcn
import { Button } from "@/components/ui/button";

// icons
import { ArrowLeft } from "@/components/icons";
import { Chips } from "@/components/shared/chips";
import { SquareCheck, Calendar } from "@/components/icons";

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

          <div className="flex flex-col">
            <h1>{project.name}</h1>
            <p>{project.description}</p>
          </div>
          {isOwner && <Link href="?modal=update-project">Modifier</Link>}
          {isOwner && (
            <Button variant="outline" onClick={() => handleDeleteProject()}>
              Supprimer
            </Button>
          )}
        </div>

        <div className="flex gap-x-2">
          <Link
            href="?modal=create-task"
            className="inline-flex h-[50px] items-center justify-center gap-2 rounded-lg bg-primary-button px-8 text-base font-normal text-primary-foreground"
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

          <Button variant="default" size="lg">
            IA
          </Button>
        </div>
      </div>

      <div className="flex mt-15">
        <div className="flex gap-10">
          <h2>Contributeurs</h2>
          <p>{allTeamMembers.length} personnes</p>
        </div>
        <div className="flex gap-4">
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

      <div className="mt-15">
        <div className="flex items-center gap-x-2.5">
          <div className="flex flex-col">
            <h2>Tâches</h2>
            <p>{project.tasks.length} tâches</p>
          </div>

          <div className="flex gap-2">
            <Chips
              icon={<SquareCheck className="w-4 h-4" />}
              label="Liste"
              isActive={true}
              onClick={() => {
                console.log("Liste");
              }}
            />
            <Chips
              icon={<Calendar className="w-4 h-4" />}
              label="Kanban"
              isActive={false}
              onClick={() => {
                console.log("Kanban");
              }}
            />
            <p>Trier par</p>
            <p>input recherche</p>
          </div>
        </div>
      </div>

      <div className="mt-15 flex flex-col gap-y-8">
        {project.tasks.map((task) => (
          <ProjectTasksCard
            key={task.id}
            task={task}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}
