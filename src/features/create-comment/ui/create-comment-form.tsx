"use client";

import { useRef } from "react";
import { Button, Textarea } from "@shared/ui";
import { createCommentAction } from "../api/create-comment-action";

type CreateCommentFormProps = {
  taskId: string;
  projectId: string;
};

export function CreateCommentForm({ taskId, projectId }: CreateCommentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(formData: FormData) {
    await createCommentAction(formData);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={handleAction} className="flex flex-col gap-2">
      <input type="hidden" name="taskId" value={taskId} />
      <input type="hidden" name="projectId" value={projectId} />
      <Textarea name="body" placeholder="コメントを入力…" rows={2} required />
      <Button type="submit" className="self-end">コメント</Button>
    </form>
  );
}
