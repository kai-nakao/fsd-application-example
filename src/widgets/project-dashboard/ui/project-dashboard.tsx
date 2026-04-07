import { Suspense } from "react";
import { getProjectById } from "@entities/project";
import { TaskList } from "@widgets/task-list";
import { MemberList } from "@widgets/member-list";
import { TaskListSkeleton } from "./task-list-skeleton";
import { MemberListSkeleton } from "./member-list-skeleton";

type ProjectDashboardProps = {
  projectId: string;
  filterStatus?: string;
  filterPriority?: string;
};

export async function ProjectDashboard({ projectId, filterStatus, filterPriority }: ProjectDashboardProps) {
  const project = await getProjectById(projectId);
  if (!project) return <p>プロジェクトが見つかりません</p>;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <p className="mt-1 text-sm text-zinc-500">{project.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <Suspense fallback={<TaskListSkeleton />}>
          <TaskList projectId={projectId} filterStatus={filterStatus} filterPriority={filterPriority} />
        </Suspense>

        <Suspense fallback={<MemberListSkeleton />}>
          <MemberList projectId={projectId} />
        </Suspense>
      </div>
    </div>
  );
}
