"use client";

import ProjectCard from "./project-card";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { User } from "@/types/user";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CreateProjectModal } from "@/components/features/projects/modals/create-project-modal";

export default function ProjectsView({
  projects,
  currentUser,
}: {
  projects: Project[];
  currentUser: User;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleOpenCreateProjectModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("modal", "create-project");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="w-11/12 lg:w-[1166px] mx-auto">
      <div className="flex flex-col gap-y-4.5 md:flex-row items-center justify-between mt-8 md:mt-12 lg:mt-19">
        <div className="flex flex-col gap-y-3.5">
          <h1>Mes projets</h1>
          <p>Gérez vos projets</p>
        </div>

        <Button
          variant="default"
          size="lg"
          onClick={handleOpenCreateProjectModal}
        >
          + Créer un projet
        </Button>
      </div>

      <CreateProjectModal currentUser={currentUser} />
      <div className="mt-8 md:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}
