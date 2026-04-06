import { Avatar } from "@shared/ui";
import type { User } from "../model";

type UserAvatarProps = {
  user: User;
  size?: "sm" | "md" | "lg";
};

export function UserAvatar({ user, size = "md" }: UserAvatarProps) {
  return <Avatar name={user.name} avatarUrl={user.avatarUrl} size={size} />;
}
