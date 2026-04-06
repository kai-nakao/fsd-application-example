import { type ReactNode } from "react";
import Link from "next/link";
import { Card } from "@shared/ui";
import { formatDate } from "@shared/lib";
import { ROUTES } from "@shared/config";
import type { Project } from "../model";

type ProjectCardProps = {
  project: Project;
  actionSlot?: ReactNode;
};

export function ProjectCard({ project, actionSlot }: ProjectCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <Link
          href={ROUTES.PROJECT_DETAIL(project.id)}
          className="text-sm font-semibold leading-tight hover:underline"
        >
          {project.name}
        </Link>
        {actionSlot}
      </div>
      <p className="text-sm text-zinc-500 line-clamp-2">{project.description}</p>
      <time className="text-xs text-zinc-400">{formatDate(project.createdAt)}</time>
    </Card>
  );
}
