"use server";

import { revalidatePath } from "next/cache";
import { addProjectMember, type ProjectRole } from "@entities/project";
import { getUserById } from "@entities/user";
import { emailSender } from "@shared/api";
import { ROUTES } from "@shared/config";

export async function addMemberAction(formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const userId = formData.get("userId") as string;
  const role = (formData.get("role") as ProjectRole) ?? "member";

  if (!projectId || !userId) return;

  await addProjectMember(projectId, userId, role);

  const user = await getUserById(userId);
  if (user) {
    await emailSender.send(
      user.email,
      "プロジェクトに招待されました",
      "あなたがプロジェクトに追加されました。",
    );
  }

  revalidatePath(ROUTES.PROJECT_DETAIL(projectId));
}
