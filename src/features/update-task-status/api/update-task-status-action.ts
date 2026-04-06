"use server";

import { revalidatePath } from "next/cache";
import { updateTaskStatus, type TaskStatus } from "@entities/task";
import { ROUTES } from "@shared/config";

export async function updateTaskStatusAction(
  taskId: string,
  status: TaskStatus,
  projectId: string,
) {
  await updateTaskStatus(taskId, status);
  revalidatePath(ROUTES.PROJECT_DETAIL(projectId));
}
