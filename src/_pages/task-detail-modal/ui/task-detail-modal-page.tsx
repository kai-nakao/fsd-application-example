import { Modal } from "@shared/ui";
import { TaskDetail } from "@widgets/task-detail";

type TaskDetailModalPageProps = {
  projectId: string;
  taskId: string;
};

export function TaskDetailModalPage({ projectId, taskId }: TaskDetailModalPageProps) {
  return (
    <Modal>
      <TaskDetail taskId={taskId} projectId={projectId} />
    </Modal>
  );
}
