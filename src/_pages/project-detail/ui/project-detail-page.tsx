import { ProjectDashboard } from "@widgets/project-dashboard";

type ProjectDetailPageProps = {
  projectId: string;
};

export function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  return (
    <div className="mx-auto w-full max-w-5xl p-8">
      <ProjectDashboard projectId={projectId} />
    </div>
  );
}
