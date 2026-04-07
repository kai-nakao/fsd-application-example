import { Suspense } from "react";
import { ProjectList, ProjectListSkeleton } from "@widgets/project-list";

export function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl p-8">
      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectList />
      </Suspense>
    </div>
  );
}
