import { describe, it, expect, beforeEach, vi } from "vitest";
import type { DbTaskAttachment } from "@shared/api/db";

vi.mock("@shared/api/db", () => {
  return {
    db: {
      taskAttachments: [] as DbTaskAttachment[],
    },
  };
});

import { db } from "@shared/api/db";
import {
  getAttachmentsByTask,
  createAttachment,
  deleteAttachment,
} from "./task-api";

describe("task attachment api", () => {
  beforeEach(() => {
    db.taskAttachments = [];
  });

  describe("getAttachmentsByTask", () => {
    it("指定タスクの添付ファイルのみ返す", async () => {
      db.taskAttachments = [
        {
          id: "att-1",
          taskId: "task-1",
          fileName: "doc.pdf",
          fileKey: "task-1/doc.pdf",
          fileUrl: "/mock-storage/task-1/doc.pdf",
          uploadedBy: "user-1",
          createdAt: "2026-04-01T00:00:00Z",
        },
        {
          id: "att-2",
          taskId: "task-2",
          fileName: "img.png",
          fileKey: "task-2/img.png",
          fileUrl: "/mock-storage/task-2/img.png",
          uploadedBy: "user-2",
          createdAt: "2026-04-01T00:00:00Z",
        },
      ];

      const result = await getAttachmentsByTask("task-1");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("att-1");
    });

    it("添付ファイルがない場合は空配列を返す", async () => {
      const result = await getAttachmentsByTask("task-999");
      expect(result).toEqual([]);
    });
  });

  describe("createAttachment", () => {
    it("添付ファイルを作成してDBに追加する", async () => {
      const attachment = await createAttachment({
        taskId: "task-1",
        fileName: "report.pdf",
        fileKey: "task-1/report.pdf",
        fileUrl: "/mock-storage/task-1/report.pdf",
        uploadedBy: "user-1",
      });

      expect(attachment.id).toBeDefined();
      expect(attachment.taskId).toBe("task-1");
      expect(attachment.fileName).toBe("report.pdf");
      expect(attachment.fileKey).toBe("task-1/report.pdf");
      expect(attachment.fileUrl).toBe("/mock-storage/task-1/report.pdf");
      expect(attachment.uploadedBy).toBe("user-1");
      expect(attachment.createdAt).toBeDefined();
      expect(db.taskAttachments).toHaveLength(1);
    });
  });

  describe("deleteAttachment", () => {
    it("添付ファイルを削除してtrueを返す", async () => {
      db.taskAttachments = [
        {
          id: "att-1",
          taskId: "task-1",
          fileName: "doc.pdf",
          fileKey: "task-1/doc.pdf",
          fileUrl: "/mock-storage/task-1/doc.pdf",
          uploadedBy: "user-1",
          createdAt: "2026-04-01T00:00:00Z",
        },
      ];

      const result = await deleteAttachment("att-1");
      expect(result).toBe(true);
      expect(db.taskAttachments).toHaveLength(0);
    });

    it("存在しないIDの場合はfalseを返す", async () => {
      const result = await deleteAttachment("att-999");
      expect(result).toBe(false);
    });
  });
});
