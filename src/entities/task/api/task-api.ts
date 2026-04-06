import { db } from "@shared/api/db";
import type { Task, TaskStatus, TaskPriority } from "../model";

export async function getTasks(): Promise<Task[]> {
  return db.tasks;
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  return db.tasks.find((t) => t.id === id);
}

export async function getTasksByProject(projectId: string): Promise<Task[]> {
  return db.tasks.filter((t) => t.projectId === projectId);
}

export async function createTask(
  data: Pick<Task, "title" | "description" | "priority" | "projectId"> & {
    assigneeId?: string;
  },
): Promise<Task> {
  const now = new Date().toISOString();
  const task: Task = {
    id: `task-${Date.now()}`,
    title: data.title,
    description: data.description,
    status: "todo",
    priority: data.priority,
    projectId: data.projectId,
    assigneeId: data.assigneeId,
    createdAt: now,
    updatedAt: now,
  };
  db.tasks.unshift(task);
  return task;
}

export async function updateTaskStatus(
  id: string,
  status: TaskStatus,
): Promise<Task | undefined> {
  const task = db.tasks.find((t) => t.id === id);
  if (!task) return undefined;
  task.status = status;
  task.updatedAt = new Date().toISOString();
  return task;
}

export async function assignTask(
  id: string,
  assigneeId: string,
): Promise<Task | undefined> {
  const task = db.tasks.find((t) => t.id === id);
  if (!task) return undefined;
  task.assigneeId = assigneeId;
  task.updatedAt = new Date().toISOString();
  return task;
}

export async function deleteTask(id: string): Promise<boolean> {
  const index = db.tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  db.tasks.splice(index, 1);
  return true;
}
