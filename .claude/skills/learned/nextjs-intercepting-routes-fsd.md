---
name: nextjs-intercepting-routes-fsd
description: "Intercepting Routes + Parallel Routes modal pattern with FSD layer structure"
user-invocable: false
origin: auto-extracted
---

# Next.js Intercepting Routes Modal with FSD

**Extracted:** 2026-04-06
**Context:** Next.js 16 の Intercepting Routes でモーダルを実装する際の FSD ファイル構成

## Problem
Intercepting Routes + Parallel Routes でモーダルを作るとき、Next.js のファイル規約と FSD のレイヤー構造をどう両立させるかが複雑。

## Solution

### App Router ファイル構成
```
app/projects/[projectId]/
  layout.tsx              <- @modal スロットを受け取る
  page.tsx                <- プロジェクトページ
  @modal/
    default.tsx           <- null を返す（モーダル非表示時のフォールバック）
    (.)tasks/[taskId]/
      page.tsx            <- モーダル版（インターセプト時）
  tasks/[taskId]/
    page.tsx              <- フルページ版（直接アクセス/リロード時）
```

### FSD レイヤー対応

**重要: モーダル版もフルページ版も _pages でラップする。**

```
_pages/
  task-detail/            <- フルページ版（戻るリンク + TaskDetail widget）
  task-detail-modal/      <- モーダル版（Modal + TaskDetail widget）
```

app/ の各 page.tsx は薄いラッパー:
```tsx
// @modal/(.)tasks/[taskId]/page.tsx
import { TaskDetailModalPage } from "@pages/task-detail-modal";
export default async function TaskModalPage({ params }) {
  const { projectId, taskId } = await params;
  return <TaskDetailModalPage projectId={projectId} taskId={taskId} />;
}
```

### Modal は shared/ui に配置
Next.js の Intercepting Routes はルーティングのみ。以下は自前実装:
- オーバーレイ（半透明背景）
- router.back() トリガー（Escape キー、背景クリック、×ボタン）
- モーダルコンテナ（カード、影、中央配置）

### layout.tsx パターン
```tsx
export default function ProjectLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
```

### default.tsx の役割
リロード時にスロットに一致するページがなければ default.tsx が使われる。
なければ 404 になるため、必ず null を返す default.tsx を配置する。

## When to Use
- Next.js App Router でモーダル表示が必要なとき
- 一覧→詳細をモーダルで開き、直接アクセス時はフルページにしたいとき
