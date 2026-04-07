import { notFound } from "next/navigation";
import { getProjectById } from "@entities/project";
import { ProjectDashboard } from "@widgets/project-dashboard";

type ProjectDetailPageProps = {
  projectId: string;
  filterStatus?: string;
  filterPriority?: string;
};

export async function ProjectDetailPage({ projectId, filterStatus, filterPriority }: ProjectDetailPageProps) {
  const project = await getProjectById(projectId);
  if (!project) notFound();

  return (
    <div className="mx-auto w-full max-w-5xl p-8">
      <ProjectDashboard projectId={projectId} filterStatus={filterStatus} filterPriority={filterPriority} />
    </div>
  );
}
