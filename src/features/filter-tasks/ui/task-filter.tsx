"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { TASK_STATUS, TASK_STATUS_LABEL, TASK_PRIORITY, TASK_PRIORITY_LABEL } from "@entities/task";

export function TaskFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") ?? "";
  const currentPriority = searchParams.get("priority") ?? "";

  function handleChange(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-3">
      <select
        value={currentStatus}
        onChange={(e) => handleChange("status", e.target.value)}
        className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs"
      >
        <option value="">全ステータス</option>
        {Object.entries(TASK_STATUS).map(([key, value]) => (
          <option key={key} value={value}>
            {TASK_STATUS_LABEL[value]}
          </option>
        ))}
      </select>
      <select
        value={currentPriority}
        onChange={(e) => handleChange("priority", e.target.value)}
        className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs"
      >
        <option value="">全優先度</option>
        {Object.entries(TASK_PRIORITY).map(([key, value]) => (
          <option key={key} value={value}>
            {TASK_PRIORITY_LABEL[value]}
          </option>
        ))}
      </select>
    </div>
  );
}
