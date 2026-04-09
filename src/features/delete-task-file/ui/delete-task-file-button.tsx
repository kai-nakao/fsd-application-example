"use client";

import { useTransition } from "react";
import { Button } from "@shared/ui";
import { deleteTaskFileAction } from "../api/delete-task-file-action";

type DeleteTaskFileButtonProps = {
  attachmentId: string;
  fileKey: string;
  projectId: string;
  taskId: string;
};

export function DeleteTaskFileButton({ attachmentId, fileKey, projectId, taskId }: DeleteTaskFileButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("このファイルを削除しますか？")) return;
    startTransition(async () => {
      await deleteTaskFileAction(attachmentId, fileKey, projectId, taskId);
    });
  }

  return (
    <Button variant="ghost" className="px-1 py-0.5 text-xs text-zinc-400" onClick={handleClick} disabled={isPending}>
      {isPending ? "…" : "削除"}
    </Button>
  );
}
