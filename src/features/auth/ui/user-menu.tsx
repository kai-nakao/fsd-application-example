import { getUserById, UserAvatar } from "@entities/user";
import { Button } from "@shared/ui";
import { getSessionUserId } from "../model";
import { logoutAction } from "../api/auth-actions";

export async function UserMenu() {
  const userId = await getSessionUserId();
  if (!userId) return null;

  const user = await getUserById(userId);
  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <UserAvatar user={user} size="sm" />
      <span className="text-sm">{user.name}</span>
      <form action={logoutAction}>
        <Button variant="ghost" type="submit" className="text-xs">
          ログアウト
        </Button>
      </form>
    </div>
  );
}
