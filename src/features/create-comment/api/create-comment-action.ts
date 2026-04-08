"use server";

import { revalidatePath } from "next/cache";
import { createComment } from "@entities/comment";
import { getSessionUserId } from "@features/auth";
import { eventTracker } from "@shared/api";
import { ROUTES } from "@shared/config";

export async function createCommentAction(formData: FormData) {
  const taskId = formData.get("taskId") as string;
  const projectId = formData.get("projectId") as string;
  const body = formData.get("body") as string;

  if (!taskId || !body?.trim()) return;

  const authorId = await getSessionUserId();
  if (!authorId) return;

  await createComment({ taskId, authorId, body: body.trim() });

  eventTracker.track({ name: "comment_created", properties: { taskId } });

  revalidatePath(ROUTES.TASK_DETAIL(projectId, taskId));
}
