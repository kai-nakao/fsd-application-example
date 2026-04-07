import Link from "next/link";
import { ROUTES } from "@shared/config";
import { getProjectById } from "@entities/project";
import { TaskDetail } from "@widgets/task-detail";

type TaskDetailPageProps = {
  projectId: string;
  taskId: string;
};

export async function TaskDetailPage({ projectId, taskId }: TaskDetailPageProps) {
  const project = await getProjectById(projectId);

  return (
    <div className="mx-auto w-full max-w-3xl p-8">
      {project && (
        <Link
          href={ROUTES.PROJECT_DETAIL(projectId)}
          className="mb-4 inline-block text-sm text-zinc-500 hover:text-zinc-700"
        >
          &larr; {project.name} に戻る
        </Link>
      )}
      <TaskDetail taskId={taskId} projectId={projectId} />
    </div>
  );
}
