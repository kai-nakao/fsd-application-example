import { getProjectsByUser, ProjectCard } from "@entities/project";
import { getSessionUserId } from "@features/auth";
import { CreateProjectForm } from "@features/create-project";

export async function ProjectList() {
  const userId = await getSessionUserId();
  if (!userId) return null;

  const projects = await getProjectsByUser(userId);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">マイプロジェクト</h2>
      </div>

      <CreateProjectForm />

      {projects.length === 0 ? (
        <p className="text-sm text-zinc-500">プロジェクトがありません</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
