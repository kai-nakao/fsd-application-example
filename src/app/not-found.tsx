import Link from "next/link";
import { Button } from "@shared/ui";
import { ROUTES } from "@shared/config";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 p-16 text-center">
      <h2 className="text-xl font-bold">ページが見つかりません</h2>
      <p className="text-sm text-zinc-500">お探しのページは存在しないか、移動した可能性があります。</p>
      <Link href={ROUTES.HOME}>
        <Button>ホームに戻る</Button>
      </Link>
    </div>
  );
}
