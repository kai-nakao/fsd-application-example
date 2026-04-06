"use client";

import { useOptimistic, useTransition } from "react";
import { TASK_STATUS, TASK_STATUS_LABEL, type TaskStatus } from "@entities/task";
import { updateTaskStatusAction } from "../api/update-task-status-action";

type TaskStatusSelectProps = {
  taskId: string;
  projectId: string;
  currentStatus: TaskStatus;
};

export function TaskStatusSelect({ taskId, projectId, currentStatus }: TaskStatusSelectProps) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(currentStatus);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as TaskStatus;
    startTransition(async () => {
      setOptimisticStatus(newStatus);
      await updateTaskStatusAction(taskId, newStatus, projectId);
    });
  }

  return (
    <select
      value={optimisticStatus}
      onChange={handleChange}
      disabled={isPending}
      className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs disabled:opacity-50"
    >
      {Object.entries(TASK_STATUS).map(([key, value]) => (
        <option key={key} value={value}>
          {TASK_STATUS_LABEL[value]}
        </option>
      ))}
    </select>
  );
}
