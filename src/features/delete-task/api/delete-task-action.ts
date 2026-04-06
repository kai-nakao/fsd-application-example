"use server";

import { revalidatePath } from "next/cache";
import { deleteTask } from "@entities/task";
import { ROUTES } from "@shared/config";

export async function deleteTaskAction(taskId: string, projectId: string) {
  await deleteTask(taskId);
  revalidatePath(ROUTES.PROJECT_DETAIL(projectId));
}
