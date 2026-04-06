"use client";

import { Button, Input, Textarea } from "@shared/ui";
import { createProjectAction } from "../api/create-project-action";

export function CreateProjectForm() {
  return (
    <form action={createProjectAction} className="flex flex-col gap-3">
      <Input name="name" placeholder="プロジェクト名" required />
      <Textarea name="description" placeholder="説明（任意）" rows={3} />
      <Button type="submit">プロジェクトを作成</Button>
    </form>
  );
}
