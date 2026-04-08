"use server";

import { revalidatePath } from "next/cache";
import { assignTask } from "@entities/task";
import { getUserById } from "@entities/user";
import { emailSender, eventTracker } from "@shared/api";
import { ROUTES } from "@shared/config";

export async function assignTaskAction(
  taskId: string,
  assigneeId: string,
  projectId: string,
) {
  await assignTask(taskId, assigneeId);

  eventTracker.track({ name: "task_assigned", properties: { taskId, assigneeId } });

  const assignee = await getUserById(assigneeId);
  if (assignee) {
    await emailSender.send(
      assignee.email,
      "タスクがアサインされました",
      "あなたにタスクがアサインされました。",
    );
  }

  revalidatePath(ROUTES.PROJECT_DETAIL(projectId));
}
