import { type ReactNode } from "react";
import { formatDate } from "@shared/lib";
import type { TaskAttachment } from "../model";

type AttachmentItemProps = {
  attachment: TaskAttachment;
  actionSlot?: ReactNode;
};

export function AttachmentItem({ attachment, actionSlot }: AttachmentItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">📎</span>
        <a
          href={attachment.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-zinc-700 hover:underline"
        >
          {attachment.fileName}
        </a>
        <time className="text-xs text-zinc-400">{formatDate(attachment.createdAt)}</time>
      </div>
      {actionSlot}
    </div>
  );
}
