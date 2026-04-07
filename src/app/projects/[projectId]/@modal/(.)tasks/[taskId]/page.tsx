import { TaskDetailModalPage } from "@pages/task-detail-modal";

type Props = {
  params: Promise<{ projectId: string; taskId: string }>;
};

export default async function TaskModalPage({ params }: Props) {
  const { projectId, taskId } = await params;
  return <TaskDetailModalPage projectId={projectId} taskId={taskId} />;
}
