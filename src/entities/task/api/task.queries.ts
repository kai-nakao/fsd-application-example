import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getTasksByProject, getTaskById } from "./task-api";

export const taskQueries = createQueryKeys("tasks", {
  list: (projectId: string) => ({
    queryKey: [projectId],
    queryFn: () => getTasksByProject(projectId),
  }),
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => getTaskById(id),
  }),
});
