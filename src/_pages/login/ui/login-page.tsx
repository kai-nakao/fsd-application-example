import { LoginForm } from "@features/auth";
import { Card } from "@shared/ui";

export function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <Card className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-xl font-bold text-center">ProjectHub</h1>
        <p className="text-sm text-zinc-500 text-center">ログインしてください</p>
        <LoginForm />
      </Card>
    </div>
  );
}
