import { getProjectMembers, ProjectRoleBadge } from "@entities/project";
import { getUsers, getUserById, UserAvatar } from "@entities/user";
import { AddMemberForm } from "@features/add-member";
import { MemberRoleSelect } from "@features/change-member-role";
import type { User } from "@entities/user";

type MemberListProps = {
  projectId: string;
};

export async function MemberList({ projectId }: MemberListProps) {
  const [members, allUsers] = await Promise.all([
    getProjectMembers(projectId),
    getUsers(),
  ]);

  const memberUserIds = new Set(members.map((m) => m.userId));
  const availableUsers = allUsers.filter((u) => !memberUserIds.has(u.id));

  const membersWithUser = await Promise.all(
    members.map(async (m) => ({
      ...m,
      user: await getUserById(m.userId),
    })),
  );

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">メンバー</h2>

      <AddMemberForm projectId={projectId} availableUsers={availableUsers} />

      <div className="flex flex-col gap-2">
        {membersWithUser.map((member) => (
          <div
            key={member.userId}
            className="flex items-center justify-between rounded-lg border border-zinc-200 p-3"
          >
            <div className="flex items-center gap-3">
              <UserAvatar user={member.user!} size="sm" />
              <span className="text-sm font-medium">{member.user?.name}</span>
              <ProjectRoleBadge role={member.role} />
            </div>
            <MemberRoleSelect
              projectId={projectId}
              userId={member.userId}
              currentRole={member.role}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
