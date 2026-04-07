"use client";

import { useTransition } from "react";
import { Button } from "@shared/ui";
import { deleteCommentAction } from "../api/delete-comment-action";

type DeleteCommentButtonProps = {
  commentId: string;
  projectId: string;
  taskId: string;
};

export function DeleteCommentButton({ commentId, projectId, taskId }: DeleteCommentButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("このコメントを削除しますか？")) return;
    startTransition(async () => {
      await deleteCommentAction(commentId, projectId, taskId);
    });
  }

  return (
    <Button variant="ghost" className="px-1 py-0.5 text-xs text-zinc-400" onClick={handleClick} disabled={isPending}>
      {isPending ? "…" : "削除"}
    </Button>
  );
}
