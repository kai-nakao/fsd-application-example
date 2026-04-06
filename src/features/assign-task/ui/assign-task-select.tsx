"use client";

import { useTransition } from "react";
import type { User } from "@entities/user";
import { assignTaskAction } from "../api/assign-task-action";

type AssignTaskSelectProps = {
  taskId: string;
  projectId: string;
  currentAssigneeId?: string;
  members: User[];
};

export function AssignTaskSelect({
  taskId,
  projectId,
  currentAssigneeId,
  members,
}: AssignTaskSelectProps) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const assigneeId = e.target.value;
    if (!assigneeId) return;
    startTransition(async () => {
      await assignTaskAction(taskId, assigneeId, projectId);
    });
  }

  return (
    <select
      value={currentAssigneeId ?? ""}
      onChange={handleChange}
      disabled={isPending}
      className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs disabled:opacity-50"
    >
      <option value="">未アサイン</option>
      {members.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}
