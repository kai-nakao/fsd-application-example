import { getTaskById, TaskStatusBadge, TaskPriorityBadge, getAttachmentsByTask, AttachmentItem } from "@entities/task";
import { getUserById, UserAvatar } from "@entities/user";
import { getCommentsByTask, CommentItem } from "@entities/comment";
import { TaskStatusSelect } from "@features/update-task-status";
import { DeleteTaskButton } from "@features/delete-task";
import { CreateCommentForm } from "@features/create-comment";
import { DeleteCommentButton } from "@features/delete-comment";
import { UploadTaskFileForm } from "@features/upload-task-file";
import { DeleteTaskFileButton } from "@features/delete-task-file";
import { formatDate } from "@shared/lib";

type TaskDetailProps = {
  taskId: string;
  projectId: string;
};

export async function TaskDetail({ taskId, projectId }: TaskDetailProps) {
  const [task, comments, attachments] = await Promise.all([
    getTaskById(taskId),
    getCommentsByTask(taskId),
    getAttachmentsByTask(taskId),
  ]);

  if (!task) return <p className="text-sm text-zinc-500">タスクが見つかりません</p>;

  const assignee = task.assigneeId ? await getUserById(task.assigneeId) : null;

  return (
    <div className="flex flex-col gap-6">
      {/* タスクヘッダー */}
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <div className="flex shrink-0 items-center gap-2">
            <TaskPriorityBadge priority={task.priority} />
            <TaskStatusSelect taskId={taskId} projectId={projectId} currentStatus={task.status} />
          </div>
        </div>
        <p className="text-sm text-zinc-600">{task.description}</p>
        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <span>作成: {formatDate(task.createdAt)}</span>
          <span>更新: {formatDate(task.updatedAt)}</span>
          {assignee && (
            <span className="flex items-center gap-1">
              担当: <UserAvatar user={assignee} size="sm" />
              <span className="text-zinc-600">{assignee.name}</span>
            </span>
          )}
        </div>
        <div>
          <DeleteTaskButton taskId={taskId} projectId={projectId} />
        </div>
      </div>

      {/* 添付ファイル */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-bold">添付ファイル ({attachments.length})</h3>

        {attachments.length === 0 ? (
          <p className="text-xs text-zinc-400">添付ファイルはありません</p>
        ) : (
          <div className="flex flex-col gap-2">
            {attachments.map((attachment) => (
              <AttachmentItem
                key={attachment.id}
                attachment={attachment}
                actionSlot={
                  <DeleteTaskFileButton
                    attachmentId={attachment.id}
                    fileKey={attachment.fileKey}
                    projectId={projectId}
                    taskId={taskId}
                  />
                }
              />
            ))}
          </div>
        )}

        <UploadTaskFileForm taskId={taskId} projectId={projectId} />
      </section>

      {/* コメント���覧 */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-bold">コメント ({comments.length})</h3>

        {comments.length === 0 ? (
          <p className="text-xs text-zinc-400">まだコメントはありません</p>
        ) : (
          <div className="flex flex-col gap-2">
            {await Promise.all(
              comments.map(async (comment) => {
                const author = await getUserById(comment.authorId);
                return (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    authorSlot={
                      author ? (
                        <span className="flex items-center gap-1">
                          <UserAvatar user={author} size="sm" />
                          <span className="text-xs font-medium">{author.name}</span>
                        </span>
                      ) : null
                    }
                    actionSlot={
                      <DeleteCommentButton
                        commentId={comment.id}
                        projectId={projectId}
                        taskId={taskId}
                      />
                    }
                  />
                );
              }),
            )}
          </div>
        )}

        <CreateCommentForm taskId={taskId} projectId={projectId} />
      </section>
    </div>
  );
}
