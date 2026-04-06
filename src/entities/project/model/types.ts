export type ProjectRole = "owner" | "member" | "viewer";

export const PROJECT_ROLE_LABEL: Record<ProjectRole, string> = {
  owner: "オーナー",
  member: "メンバー",
  viewer: "閲覧者",
};

export type ProjectMember = {
  projectId: string;
  userId: string;
  role: ProjectRole;
  joinedAt: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};
