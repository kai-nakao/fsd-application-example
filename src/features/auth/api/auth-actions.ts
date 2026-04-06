"use server";

import { redirect } from "next/navigation";
import { getUserById } from "@entities/user";
import { eventTracker } from "@shared/api";
import { ROUTES } from "@shared/config";
import { setSessionUserId, clearSession } from "../model";

export async function loginAction(formData: FormData) {
  const userId = formData.get("userId") as string;

  if (!userId) return;

  const user = await getUserById(userId);
  if (!user) return;

  await setSessionUserId(userId);
  eventTracker.identify(userId, { name: user.name, email: user.email });
  eventTracker.track({ name: "user_login", properties: { userId } });

  redirect(ROUTES.HOME);
}

export async function logoutAction() {
  eventTracker.track({ name: "user_logout" });
  await clearSession();
  redirect(ROUTES.LOGIN);
}
