import Link from "next/link";
import { getTasksByProject, TaskCard, type TaskStatus, type TaskPriority } from "@entities/task";
import { getProjectMembers } from "@entities/project";
import { getUserById } from "@entities/user";
import { CreateTaskForm } from "@features/create-task";
import { TaskFilter } from "@features/filter-tasks";
import { TaskStatusSelect } from "@features/update-task-status";
import { DeleteTaskButton } from "@features/delete-task";
import { AssignTaskSelect } from "@features/assign-task";
import { ROUTES } from "@shared/config";
import type { User } from "@entities/user";

type TaskListProps = {
  projectId: string;
  filterStatus?: string;
  filterPriority?: string;
};

export async function TaskList({ projectId, filterStatus, filterPriority }: TaskListProps) {
  const [allTasks, members] = await Promise.all([
    getTasksByProject(projectId),
    getProjectMembers(projectId),
  ]);

  const memberUsers: User[] = (
    await Promise.all(members.map((m) => getUserById(m.userId)))
  ).filter((u): u is User => u !== undefined);

  const tasks = allTasks.filter((task) => {
    if (filterStatus && task.status !== filterStatus) return false;
    if (filterPriority && task.priority !== filterPriority) return false;
    return true;
  });

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">タスク</h2>
        <TaskFilter />
      </div>

      <CreateTaskForm projectId={projectId} />

      {tasks.length === 0 ? (
        <p className="text-sm text-zinc-500">タスクがありません</p>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              titleSlot={
                <Link
                  href={ROUTES.TASK_DETAIL(projectId, task.id)}
                  className="text-sm font-semibold leading-tight hover:underline"
                >
                  {task.title}
                </Link>
              }
              actionSlot={
                <div className="flex items-center gap-2">
                  <AssignTaskSelect
                    taskId={task.id}
                    projectId={projectId}
                    currentAssigneeId={task.assigneeId}
                    members={memberUsers}
                  />
                  <TaskStatusSelect
                    taskId={task.id}
                    projectId={projectId}
                    currentStatus={task.status}
                  />
                  <DeleteTaskButton taskId={task.id} projectId={projectId} />
                </div>
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
