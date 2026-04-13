import ProjectsView from "@/components/features/projects/projects-view";
import { getToken, getSession } from "@/lib/auth/session";
import { getProjects, getTasksByProjectId } from "@/lib/api/projects";

export default async function ProjectPage() {
  const token = await getToken();
  const rawProjects = await getProjects(token as string);
  const currentUser = (await getSession())!;

  const formatedProjects = await Promise.all(
    rawProjects.map(async (project) => {
      const projectTasks = await getTasksByProjectId(
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
      {<ProjectsView projects={formatedProjects} currentUser={currentUser} />}
    </div>
  );
}
