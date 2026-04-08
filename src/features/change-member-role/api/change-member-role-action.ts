"use server";

import { revalidatePath } from "next/cache";
import { changeProjectMemberRole, type ProjectRole } from "@entities/project";
import { eventTracker } from "@shared/api";
import { ROUTES } from "@shared/config";

export async function changeMemberRoleAction(
  projectId: string,
  userId: string,
  role: ProjectRole,
) {
  await changeProjectMemberRole(projectId, userId, role);

  eventTracker.track({ name: "member_role_changed", properties: { projectId, userId, newRole: role } });

  revalidatePath(ROUTES.PROJECT_DETAIL(projectId));
}
