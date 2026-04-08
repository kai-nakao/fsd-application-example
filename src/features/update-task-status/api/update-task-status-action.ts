"use server";

import { revalidatePath } from "next/cache";
import { updateTaskStatus, type TaskStatus } from "@entities/task";
import { eventTracker } from "@shared/api";
import { ROUTES } from "@shared/config";

export async function updateTaskStatusAction(
  taskId: string,
  status: TaskStatus,
  projectId: string,
) {
  await updateTaskStatus(taskId, status);

  eventTracker.track({ name: "task_status_changed", properties: { taskId, status } });

  revalidatePath(ROUTES.PROJECT_DETAIL(projectId));
}
