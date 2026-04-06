export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  PROJECT_DETAIL: (id: string) => `/projects/${id}`,
  TASK_DETAIL: (projectId: string, taskId: string) =>
    `/projects/${projectId}/tasks/${taskId}`,
} as const;
