import { TaskDetailPage } from "@pages/task-detail";

type Props = {
  params: Promise<{ projectId: string; taskId: string }>;
};

export default async function TaskPage({ params }: Props) {
  const { projectId, taskId } = await params;
  return <TaskDetailPage projectId={projectId} taskId={taskId} />;
}
