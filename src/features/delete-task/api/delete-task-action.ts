"use server";

import { revalidatePath } from "next/cache";
import { deleteTask } from "@entities/task";
import { eventTracker } from "@shared/api";
import { ROUTES } from "@shared/config";

export async function deleteTaskAction(taskId: string, projectId: string) {
  await deleteTask(taskId);

  eventTracker.track({ name: "task_deleted", properties: { taskId, projectId } });

  revalidatePath(ROUTES.PROJECT_DETAIL(projectId));
}
