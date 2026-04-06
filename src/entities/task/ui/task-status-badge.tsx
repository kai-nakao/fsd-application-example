import { Badge } from "@shared/ui";
import { TASK_STATUS, TASK_STATUS_LABEL, type TaskStatus } from "../model";

const statusVariant: Record<TaskStatus, "default" | "warning" | "success"> = {
  [TASK_STATUS.TODO]: "default",
  [TASK_STATUS.IN_PROGRESS]: "warning",
  [TASK_STATUS.DONE]: "success",
};

type TaskStatusBadgeProps = {
  status: TaskStatus;
};

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  return <Badge variant={statusVariant[status]}>{TASK_STATUS_LABEL[status]}</Badge>;
}
