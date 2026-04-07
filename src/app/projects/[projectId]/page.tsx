import { ProjectDetailPage } from "@pages/project-detail";

type Props = {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ status?: string; priority?: string }>;
};

export default async function ProjectPage({ params, searchParams }: Props) {
  const { projectId } = await params;
  const { status, priority } = await searchParams;
  return <ProjectDetailPage projectId={projectId} filterStatus={status} filterPriority={priority} />;
}
