"use server";

import { revalidatePath } from "next/cache";
import { changeProjectMemberRole, type ProjectRole } from "@entities/project";
import { ROUTES } from "@shared/config";

export async function changeMemberRoleAction(
  projectId: string,
  userId: string,
  role: ProjectRole,
) {
  await changeProjectMemberRole(projectId, userId, role);
  revalidatePath(ROUTES.PROJECT_DETAIL(projectId));
}
