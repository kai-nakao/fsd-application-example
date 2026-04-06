import Link from "next/link";
import { ROUTES } from "@shared/config";
import { UserMenu } from "@features/auth";

export function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href={ROUTES.HOME} className="text-lg font-bold">
          ProjectHub
        </Link>
        <UserMenu />
      </div>
    </header>
  );
}
