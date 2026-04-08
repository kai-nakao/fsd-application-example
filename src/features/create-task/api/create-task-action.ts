"use server";

import { revalidatePath } from "next/cache";
import { createTask, type TaskPriority } from "@entities/task";
import { eventTracker } from "@shared/api";
import { ROUTES } from "@shared/config";

export async function createTaskAction(formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = (formData.get("priority") as TaskPriority) ?? "medium";

  if (!projectId || !title?.trim()) return;

  const task = await createTask({
    title: title.trim(),
    description: description?.trim() ?? "",
    priority,
    projectId,
  });

  eventTracker.track({ name: "task_created", properties: { projectId, taskId: task.id } });

  revalidatePath(ROUTES.PROJECT_DETAIL(projectId));
}
