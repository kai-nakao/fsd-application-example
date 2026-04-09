"use client";

import { useRef } from "react";
import { Button } from "@shared/ui";
import { uploadTaskFileAction } from "../api/upload-task-file-action";

type UploadTaskFileFormProps = {
  taskId: string;
  projectId: string;
};

export function UploadTaskFileForm({ taskId, projectId }: UploadTaskFileFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(formData: FormData) {
    await uploadTaskFileAction(formData);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={handleAction} className="flex items-center gap-2">
      <input type="hidden" name="taskId" value={taskId} />
      <input type="hidden" name="projectId" value={projectId} />
      <input
        type="file"
        name="file"
        required
        className="text-sm text-zinc-600 file:mr-2 file:rounded-md file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-zinc-200"
      />
      <Button type="submit" className="shrink-0">アップロード</Button>
    </form>
  );
}
