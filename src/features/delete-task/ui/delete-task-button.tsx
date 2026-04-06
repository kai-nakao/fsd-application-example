"use client";

import { useTransition } from "react";
import { Button } from "@shared/ui";
import { deleteTaskAction } from "../api/delete-task-action";

type DeleteTaskButtonProps = {
  taskId: string;
  projectId: string;
};

export function DeleteTaskButton({ taskId, projectId }: DeleteTaskButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("このタスクを削除しますか？")) return;
    startTransition(async () => {
      await deleteTaskAction(taskId, projectId);
    });
  }

  return (
    <Button variant="danger" className="px-2 py-1 text-xs" onClick={handleClick} disabled={isPending}>
      {isPending ? "削除中…" : "削除"}
    </Button>
  );
}
