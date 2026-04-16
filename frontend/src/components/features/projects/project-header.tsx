"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Composants features
import { CreateTaskModal } from "@/components/features/tasks/modals/create-task-modal";
import { UpdateTaskModal } from "@/components/features/tasks/modals/update-tasks-modal";
import { ManageTaskIAModal } from "@/components/features/tasks/modals/manage-task-ia-modal";
import { UpdateProjectModal } from "@/components/features/projects/modals/update-project-modal";

// Composants UI Shadcn
import { Button, buttonVariants } from "@/components/ui/button";

// icons
import { ArrowLeft, Star } from "@/components/icons";

// types et actions
import { type User } from "@/types/user";
import { type ProjectWithTasks } from "@/types/project";

interface ProjectHeaderProps {
  project: ProjectWithTasks;
  currentUser: User;
  isOwner: boolean;
  projectMember: User[];
  handleDeleteProject: () => void;
}

export default function ProjectHeader({
  project,
  currentUser,
  isOwner,
  projectMember,
  handleDeleteProject,
}: ProjectHeaderProps) {
  const router = useRouter();
  return (
    <section className="w-full relative" aria-labelledby="project-description">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-y-6">
        <div className="flex items-start gap-x-6 xl:gap-x-0">
          <Button
            variant="ghost"
            className="bg-white rounded-xl border border-border shrink-0 size-[57px] shadow-sm p-0 flex items-center justify-center mt-1 xl:mt-0 xl:absolute xl:-left-[73px]"
            onClick={() => router.back()}
            aria-label="Retour sur la page précédente"
          >
            <ArrowLeft className="size-5 text-muted-foreground" />
          </Button>

          <div className="flex flex-col">
            <div className="flex items-center flex-wrap gap-x-3">
              <h1 id="project-description" className="text-2xl font-semibold">
                {project.name}
              </h1>
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

          <Link
            href="?modal=task-ia"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "bg-primary hover:bg-primary-foreground hover:text-primary border hover:border-primary shrink-0 gap-x-2",
            )}
            aria-label="Générer des tâches grâce à l'IA"
          >
            <Star className="w-5.25 h-5.25" />
            IA
          </Link>

          <ManageTaskIAModal />
        </div>
      </div>
    </section>
  );
}
