import { getToken } from "@/lib/auth/session";
import ProjectDetailView from "@/components/features/projects/project-detail-view";

export default async function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const token = await getToken();

  const projectId = params.id;

  // const projectDetails = await getProjectById(token as string, projectId);

  return (
    <div className="p-8">
      <ProjectDetailView />
    </div>
  );
}
