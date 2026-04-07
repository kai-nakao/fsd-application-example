import { ProjectDetailPage } from "@pages/project-detail";

type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params;
  return <ProjectDetailPage projectId={projectId} />;
}
