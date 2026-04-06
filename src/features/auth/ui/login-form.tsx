import { getUsers } from "@entities/user";
import { Button } from "@shared/ui";
import { loginAction } from "../api/auth-actions";

export async function LoginForm() {
  const users = await getUsers();

  return (
    <form action={loginAction} className="flex flex-col gap-4">
      <label className="text-sm font-medium">ユーザーを選択してログイン</label>
      <select
        name="userId"
        className="flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>
      <Button type="submit">ログイン</Button>
    </form>
  );
}
