"use server";

import { revalidatePath } from "next/cache";
import { deleteComment } from "@entities/comment";
import { eventTracker } from "@shared/api";
import { ROUTES } from "@shared/config";

export async function deleteCommentAction(
  commentId: string,
  projectId: string,
  taskId: string,
) {
  await deleteComment(commentId);

  eventTracker.track({ name: "comment_deleted", properties: { commentId } });

  revalidatePath(ROUTES.TASK_DETAIL(projectId, taskId));
}
