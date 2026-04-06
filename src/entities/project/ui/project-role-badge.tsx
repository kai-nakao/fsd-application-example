import { Badge } from "@shared/ui";
import { PROJECT_ROLE_LABEL, type ProjectRole } from "../model";

const roleVariant: Record<ProjectRole, "default" | "success" | "warning"> = {
  owner: "success",
  member: "default",
  viewer: "warning",
};

type ProjectRoleBadgeProps = {
  role: ProjectRole;
};

export function ProjectRoleBadge({ role }: ProjectRoleBadgeProps) {
  return <Badge variant={roleVariant[role]}>{PROJECT_ROLE_LABEL[role]}</Badge>;
}
