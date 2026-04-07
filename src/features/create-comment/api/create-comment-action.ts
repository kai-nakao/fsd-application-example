"use server";

import { revalidatePath } from "next/cache";
import { createComment } from "@entities/comment";
import { getSessionUserId } from "@features/auth";
import { ROUTES } from "@shared/config";

export async function createCommentAction(formData: FormData) {
  const taskId = formData.get("taskId") as string;
  const projectId = formData.get("projectId") as string;
  const body = formData.get("body") as string;

  if (!taskId || !body?.trim()) return;

  const authorId = await getSessionUserId();
  if (!authorId) return;

  await createComment({ taskId, authorId, body: body.trim() });

  revalidatePath(ROUTES.TASK_DETAIL(projectId, taskId));
}
