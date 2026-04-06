"use server";

import { revalidatePath } from "next/cache";
import { createTask, type TaskPriority } from "@entities/task";
import { ROUTES } from "@shared/config";

export async function createTaskAction(formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = (formData.get("priority") as TaskPriority) ?? "medium";

  if (!projectId || !title?.trim()) return;

  await createTask({
    title: title.trim(),
    description: description?.trim() ?? "",
    priority,
    projectId,
  });

  revalidatePath(ROUTES.PROJECT_DETAIL(projectId));
}
