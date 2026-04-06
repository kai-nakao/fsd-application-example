// 全エンティティのインメモリストア

export type DbUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
};

export type DbProjectRole = "owner" | "member" | "viewer";

export type DbProjectMember = {
  projectId: string;
  userId: string;
  role: DbProjectRole;
  joinedAt: string;
};

export type DbProject = {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type DbTaskStatus = "todo" | "in_progress" | "done";
export type DbTaskPriority = "low" | "medium" | "high";

export type DbTask = {
  id: string;
  title: string;
  description: string;
  status: DbTaskStatus;
  priority: DbTaskPriority;
  projectId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
};

export const db = {
  users: [
    {
      id: "user-1",
      name: "田中太郎",
      email: "tanaka@example.com",
      createdAt: "2026-01-01T00:00:00Z",
    },
    {
      id: "user-2",
      name: "佐藤花子",
      email: "sato@example.com",
      createdAt: "2026-01-15T00:00:00Z",
    },
    {
      id: "user-3",
      name: "鈴木一郎",
      email: "suzuki@example.com",
      createdAt: "2026-02-01T00:00:00Z",
    },
  ] as DbUser[],

  projects: [
    {
      id: "proj-1",
      name: "FSD 学習プロジェクト",
      description: "Feature-Sliced Design のハンズオン学習",
      ownerId: "user-1",
      createdAt: "2026-03-01T00:00:00Z",
      updatedAt: "2026-03-01T00:00:00Z",
    },
    {
      id: "proj-2",
      name: "社内ツール開発",
      description: "社内向けの業務効率化ツールを開発する",
      ownerId: "user-2",
      createdAt: "2026-03-15T00:00:00Z",
      updatedAt: "2026-03-15T00:00:00Z",
    },
  ] as DbProject[],

  projectMembers: [
    { projectId: "proj-1", userId: "user-1", role: "owner", joinedAt: "2026-03-01T00:00:00Z" },
    { projectId: "proj-1", userId: "user-2", role: "member", joinedAt: "2026-03-02T00:00:00Z" },
    { projectId: "proj-2", userId: "user-2", role: "owner", joinedAt: "2026-03-15T00:00:00Z" },
    { projectId: "proj-2", userId: "user-1", role: "member", joinedAt: "2026-03-16T00:00:00Z" },
    { projectId: "proj-2", userId: "user-3", role: "viewer", joinedAt: "2026-03-17T00:00:00Z" },
  ] as DbProjectMember[],

  tasks: [
    {
      id: "task-1",
      title: "shared レイヤーの設計",
      description: "共通 UI コンポーネントとユーティリティを整備する",
      status: "done",
      priority: "high",
      projectId: "proj-1",
      assigneeId: "user-1",
      createdAt: "2026-03-01T09:00:00Z",
      updatedAt: "2026-03-05T12:00:00Z",
    },
    {
      id: "task-2",
      title: "entities レイヤーの実装",
      description: "User, Project, Task エンティティを定義する",
      status: "in_progress",
      priority: "high",
      projectId: "proj-1",
      assigneeId: "user-2",
      createdAt: "2026-03-03T10:00:00Z",
      updatedAt: "2026-03-28T14:00:00Z",
    },
    {
      id: "task-3",
      title: "認証機能の追加",
      description: "Cookie ベースのセッション管理を実装する",
      status: "todo",
      priority: "medium",
      projectId: "proj-1",
      createdAt: "2026-03-10T08:00:00Z",
      updatedAt: "2026-03-10T08:00:00Z",
    },
    {
      id: "task-4",
      title: "管理画面のモックアップ",
      description: "Figma でワイヤーフレームを作成する",
      status: "in_progress",
      priority: "medium",
      projectId: "proj-2",
      assigneeId: "user-2",
      createdAt: "2026-03-16T09:00:00Z",
      updatedAt: "2026-03-25T11:00:00Z",
    },
    {
      id: "task-5",
      title: "API 設計書の作成",
      description: "REST API のエンドポイント設計を文書化する",
      status: "todo",
      priority: "low",
      projectId: "proj-2",
      assigneeId: "user-1",
      createdAt: "2026-03-18T10:00:00Z",
      updatedAt: "2026-03-18T10:00:00Z",
    },
  ] as DbTask[],
};
