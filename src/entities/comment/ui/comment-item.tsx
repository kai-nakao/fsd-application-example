import { type ReactNode } from "react";
import { formatDate } from "@shared/lib";
import type { Comment } from "../model";

type CommentItemProps = {
  comment: Comment;
  authorSlot: ReactNode;
  actionSlot?: ReactNode;
};

export function CommentItem({ comment, authorSlot, actionSlot }: CommentItemProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {authorSlot}
          <time className="text-xs text-zinc-400">{formatDate(comment.createdAt)}</time>
        </div>
        {actionSlot}
      </div>
      <p className="text-sm text-zinc-700 whitespace-pre-wrap">{comment.body}</p>
    </div>
  );
}
