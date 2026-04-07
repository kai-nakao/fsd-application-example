import Link from "next/link";
import { notFound } from "next/navigation";
import { ROUTES } from "@shared/config";
import { getProjectById } from "@entities/project";
import { getTaskById } from "@entities/task";
import { TaskDetail } from "@widgets/task-detail";

type TaskDetailPageProps = {
  projectId: string;
  taskId: string;
};

export async function TaskDetailPage({ projectId, taskId }: TaskDetailPageProps) {
  const [project, task] = await Promise.all([
    getProjectById(projectId),
    getTaskById(taskId),
  ]);

  if (!project || !task) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl p-8">
      <Link
        href={ROUTES.PROJECT_DETAIL(projectId)}
        className="mb-4 inline-block text-sm text-zinc-500 hover:text-zinc-700"
      >
        &larr; {project.name} に戻る
      </Link>
      <TaskDetail taskId={taskId} projectId={projectId} />
    </div>
  );
}
