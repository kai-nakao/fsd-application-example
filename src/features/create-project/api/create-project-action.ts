"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createProject } from "@entities/project";
import { getSessionUserId } from "@features/auth";
import { ROUTES } from "@shared/config";

export async function createProjectAction(formData: FormData) {
  const userId = await getSessionUserId();
  if (!userId) redirect(ROUTES.LOGIN);

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name?.trim()) return;

  const project = await createProject({ name: name.trim(), description: description?.trim() ?? "" }, userId);

  revalidatePath(ROUTES.HOME);
  redirect(ROUTES.PROJECT_DETAIL(project.id));
}
