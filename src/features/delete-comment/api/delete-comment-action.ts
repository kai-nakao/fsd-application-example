"use server";

import { revalidatePath } from "next/cache";
import { deleteComment } from "@entities/comment";
import { ROUTES } from "@shared/config";

export async function deleteCommentAction(
  commentId: string,
  projectId: string,
  taskId: string,
) {
  await deleteComment(commentId);
  revalidatePath(ROUTES.TASK_DETAIL(projectId, taskId));
}
