"use client";

import { useRef } from "react";
import { Button } from "@shared/ui";
import { PROJECT_ROLE_LABEL, type ProjectRole } from "@entities/project";
import type { User } from "@entities/user";
import { addMemberAction } from "../api/add-member-action";

type AddMemberFormProps = {
  projectId: string;
  availableUsers: User[];
};

export function AddMemberForm({ projectId, availableUsers }: AddMemberFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(formData: FormData) {
    await addMemberAction(formData);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={handleAction} className="flex items-end gap-2">
      <input type="hidden" name="projectId" value={projectId} />
      <select
        name="userId"
        required
        className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm"
      >
        <option value="">ユーザーを選択</option>
        {availableUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <select
        name="role"
        defaultValue="member"
        className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm"
      >
        {(Object.entries(PROJECT_ROLE_LABEL) as [ProjectRole, string][])
          .filter(([role]) => role !== "owner")
          .map(([role, label]) => (
            <option key={role} value={role}>
              {label}
            </option>
          ))}
      </select>
      <Button type="submit">追加</Button>
    </form>
  );
}
