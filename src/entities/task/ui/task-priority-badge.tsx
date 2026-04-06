import { Badge } from "@shared/ui";
import { TASK_PRIORITY, TASK_PRIORITY_LABEL, type TaskPriority } from "../model";

const priorityVariant: Record<TaskPriority, "default" | "warning" | "danger"> = {
  [TASK_PRIORITY.LOW]: "default",
  [TASK_PRIORITY.MEDIUM]: "warning",
  [TASK_PRIORITY.HIGH]: "danger",
};

type TaskPriorityBadgeProps = {
  priority: TaskPriority;
};

export function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  return <Badge variant={priorityVariant[priority]}>{TASK_PRIORITY_LABEL[priority]}</Badge>;
}
