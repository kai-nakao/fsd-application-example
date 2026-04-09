"use server";

import { revalidatePath } from "next/cache";
import { deleteAttachment } from "@entities/task";
import { fileStorage } from "@shared/api";
import { eventTracker } from "@shared/api";
import { ROUTES } from "@shared/config";

export async function deleteTaskFileAction(
  attachmentId: string,
  fileKey: string,
  projectId: string,
  taskId: string,
) {
  await fileStorage.remove(fileKey);
  await deleteAttachment(attachmentId);

  eventTracker.track({ name: "task_file_deleted", properties: { attachmentId } });

  revalidatePath(ROUTES.TASK_DETAIL(projectId, taskId));
}
