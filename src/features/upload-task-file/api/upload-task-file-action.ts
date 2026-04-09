"use server";

import { revalidatePath } from "next/cache";
import { createAttachment } from "@entities/task";
import { fileStorage } from "@shared/api";
import { getSessionUserId } from "@features/auth";
import { eventTracker } from "@shared/api";
import { ROUTES } from "@shared/config";

export async function uploadTaskFileAction(formData: FormData) {
  const taskId = formData.get("taskId") as string;
  const projectId = formData.get("projectId") as string;
  const file = formData.get("file") as File | null;

  if (!taskId || !file || file.size === 0) return;

  const userId = await getSessionUserId();
  if (!userId) return;

  const fileKey = `tasks/${taskId}/${Date.now()}-${file.name}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileUrl = await fileStorage.upload(fileKey, buffer);

  await createAttachment({
    taskId,
    fileName: file.name,
    fileKey,
    fileUrl,
    uploadedBy: userId,
  });

  eventTracker.track({ name: "task_file_uploaded", properties: { taskId } });

  revalidatePath(ROUTES.TASK_DETAIL(projectId, taskId));
}
