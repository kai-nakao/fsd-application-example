"use client";

import { useRef } from "react";
import { Button, Input, Textarea } from "@shared/ui";
import { TASK_PRIORITY, TASK_PRIORITY_LABEL } from "@entities/task";
import { createTaskAction } from "../api/create-task-action";

type CreateTaskFormProps = {
  projectId: string;
};

export function CreateTaskForm({ projectId }: CreateTaskFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(formData: FormData) {
    await createTaskAction(formData);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={handleAction} className="flex flex-col gap-3">
      <input type="hidden" name="projectId" value={projectId} />
      <Input name="title" placeholder="タスク名" required />
      <Textarea name="description" placeholder="説明（任意）" rows={2} />
      <div className="flex items-center gap-3">
        <select
          name="priority"
          defaultValue="medium"
          className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm"
        >
          {Object.entries(TASK_PRIORITY).map(([key, value]) => (
            <option key={key} value={value}>
              {TASK_PRIORITY_LABEL[value]}
            </option>
          ))}
        </select>
        <Button type="submit">タスクを追加</Button>
      </div>
    </form>
  );
}
