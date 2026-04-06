import { type ReactNode } from "react";
import { Card } from "@shared/ui";
import { formatDate } from "@shared/lib";
import type { Task } from "../model";
import { TaskStatusBadge } from "./task-status-badge";
import { TaskPriorityBadge } from "./task-priority-badge";

type TaskCardProps = {
  task: Task;
  actionSlot?: ReactNode;
};

export function TaskCard({ task, actionSlot }: TaskCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-tight">{task.title}</h3>
        <div className="flex shrink-0 gap-1.5">
          <TaskPriorityBadge priority={task.priority} />
          <TaskStatusBadge status={task.status} />
        </div>
      </div>
      <p className="text-sm text-zinc-500 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between">
        <time className="text-xs text-zinc-400">{formatDate(task.createdAt)}</time>
        {actionSlot}
      </div>
    </Card>
  );
}
