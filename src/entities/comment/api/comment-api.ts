import { db } from "@shared/api/db";
import type { Comment } from "../model";

export async function getCommentsByTask(taskId: string): Promise<Comment[]> {
  return db.comments.filter((c) => c.taskId === taskId);
}

export async function createComment(
  data: Pick<Comment, "taskId" | "authorId" | "body">,
): Promise<Comment> {
  const comment: Comment = {
    id: `comment-${Date.now()}`,
    taskId: data.taskId,
    authorId: data.authorId,
    body: data.body,
    createdAt: new Date().toISOString(),
  };
  db.comments.push(comment);
  return comment;
}

export async function deleteComment(id: string): Promise<boolean> {
  const index = db.comments.findIndex((c) => c.id === id);
  if (index === -1) return false;
  db.comments.splice(index, 1);
  return true;
}
