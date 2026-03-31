import { Project } from "@/types/project";
import ProjectCard from "./project-card";
import { Button } from "@/components/ui/button";

export default function ProjectsView({ projects }: { projects: Project[] }) {
  return (
    <div className="w-[1166px] mx-auto">
      <div className="flex flex-col gap-y-4.5 md:flex-row items-center justify-between mt-19">
        <div className="flex flex-col gap-y-3.5">
          <h1>Mes projets</h1>
          <p>Gérez vos projets</p>
        </div>

        <Button variant="default" size="lg">
          + Créer un projet
        </Button>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
