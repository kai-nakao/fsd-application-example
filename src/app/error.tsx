"use client";

import { Button } from "@shared/ui";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 p-16 text-center">
      <h2 className="text-xl font-bold">エラーが発生しました</h2>
      <p className="text-sm text-zinc-500">{error.message}</p>
      <Button onClick={reset}>再試行</Button>
    </div>
  );
}
