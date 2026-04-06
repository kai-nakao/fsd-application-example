"use client";

import { useTransition } from "react";
import { PROJECT_ROLE_LABEL, type ProjectRole } from "@entities/project";
import { changeMemberRoleAction } from "../api/change-member-role-action";

type MemberRoleSelectProps = {
  projectId: string;
  userId: string;
  currentRole: ProjectRole;
};

export function MemberRoleSelect({ projectId, userId, currentRole }: MemberRoleSelectProps) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = e.target.value as ProjectRole;
    startTransition(async () => {
      await changeMemberRoleAction(projectId, userId, newRole);
    });
  }

  return (
    <select
      value={currentRole}
      onChange={handleChange}
      disabled={isPending || currentRole === "owner"}
      className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs disabled:opacity-50"
    >
      {(Object.entries(PROJECT_ROLE_LABEL) as [ProjectRole, string][]).map(([role, label]) => (
        <option key={role} value={role}>
          {label}
        </option>
      ))}
    </select>
  );
}
