import { db } from "@shared/api/db";
import type { Project, ProjectMember, ProjectRole } from "../model";

export async function getProjects(): Promise<Project[]> {
  return db.projects;
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return db.projects.find((p) => p.id === id);
}

export async function getProjectsByUser(userId: string): Promise<Project[]> {
  const memberProjectIds = db.projectMembers
    .filter((m) => m.userId === userId)
    .map((m) => m.projectId);
  return db.projects.filter((p) => memberProjectIds.includes(p.id));
}

export async function getProjectMembers(projectId: string): Promise<ProjectMember[]> {
  return db.projectMembers.filter((m) => m.projectId === projectId);
}

export async function createProject(
  data: Pick<Project, "name" | "description">,
  ownerId: string,
): Promise<Project> {
  const now = new Date().toISOString();
  const project: Project = {
    id: `proj-${Date.now()}`,
    name: data.name,
    description: data.description,
    ownerId,
    createdAt: now,
    updatedAt: now,
  };
  db.projects.push(project);
  db.projectMembers.push({
    projectId: project.id,
    userId: ownerId,
    role: "owner",
    joinedAt: now,
  });
  return project;
}

export async function addProjectMember(
  projectId: string,
  userId: string,
  role: ProjectRole = "member",
): Promise<ProjectMember> {
  const member: ProjectMember = {
    projectId,
    userId,
    role,
    joinedAt: new Date().toISOString(),
  };
  db.projectMembers.push(member);
  return member;
}

export async function changeProjectMemberRole(
  projectId: string,
  userId: string,
  role: ProjectRole,
): Promise<ProjectMember | undefined> {
  const existing = db.projectMembers.find(
    (m) => m.projectId === projectId && m.userId === userId,
  );
  if (!existing) return undefined;
  existing.role = role;
  return existing;
}
