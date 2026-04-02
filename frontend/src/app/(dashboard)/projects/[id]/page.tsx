import { getToken, requireSession } from "@/lib/auth/session";
import ProjectDetailView from "@/components/features/projects/project-detail-view";
import { getProjectById } from "@/lib/api/projects";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const token = await getToken();
  const resolvedParams = await params;
  const projectId = resolvedParams.id;
  const projectDetails = await getProjectById(token as string, projectId);
  const currentUser = await requireSession();
  
  return (
    <div className="p-8">
      <ProjectDetailView project={projectDetails} currentUser={currentUser} />
    </div>
  );
}
