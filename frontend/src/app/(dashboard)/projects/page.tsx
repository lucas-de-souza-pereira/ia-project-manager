import ProjectsView from "@/components/features/projects/projects-view";
import { getToken, requireSession } from "@/lib/auth/session";
import { getProjects, getAllTasksProject } from "@/lib/api/projects";

export default async function ProjectPage() {
  const token = await getToken();
  const rawProjects = await getProjects(token as string);
  const user = await requireSession();

  const formatedProjects = await Promise.all(
    rawProjects.map(async (project) => {
      const projectTasks = await getAllTasksProject(
        token as string,
        project.id,
      );
      const totalTasks = project._count.tasks;
      const completedTasks = projectTasks.filter(
        (t) => t.status === "DONE",
      ).length;
      const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      return {
        ...project,
        progress: Math.round(progress),
        completedTasksCount: completedTasks,
      };
    }),
  );
  return (
    <div>
      {<ProjectsView projects={formatedProjects} userName={user.name} />}
    </div>
  );
}
