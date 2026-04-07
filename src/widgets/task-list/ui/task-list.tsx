import { getTasksByProject, TaskCard } from "@entities/task";
import { getProjectMembers } from "@entities/project";
import { getUserById } from "@entities/user";
import { CreateTaskForm } from "@features/create-task";
import { TaskStatusSelect } from "@features/update-task-status";
import { DeleteTaskButton } from "@features/delete-task";
import { AssignTaskSelect } from "@features/assign-task";
import type { User } from "@entities/user";

type TaskListProps = {
  projectId: string;
};

export async function TaskList({ projectId }: TaskListProps) {
  const [tasks, members] = await Promise.all([
    getTasksByProject(projectId),
    getProjectMembers(projectId),
  ]);

  const memberUsers: User[] = (
    await Promise.all(members.map((m) => getUserById(m.userId)))
  ).filter((u): u is User => u !== undefined);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">タスク</h2>

      <CreateTaskForm projectId={projectId} />

      {tasks.length === 0 ? (
        <p className="text-sm text-zinc-500">タスクがありません</p>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
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
