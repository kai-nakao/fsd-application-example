---
name: fsd-slice-granularity
description: "FSD entity/feature slice decisions: entity = DB table, feature = 1 user action"
user-invocable: false
origin: auto-extracted
---

# FSD Slice Granularity Decisions

**Extracted:** 2026-04-06
**Context:** Feature-Sliced Design でエンティティやフィーチャーを切る粒度の判断

## Problem
FSD で新しいスライスを作るとき、エンティティを切るべきか、フィーチャーをどこまで細かく分けるべきかの判断が曖昧になる。

## Solution

### エンティティを切る判断
**「DBにテーブルがあるか？」** — これだけ。

- テーブルがある → entities スライスを切る
- 従属テーブル（単独で意味を持たない）→ 親エンティティに含める
  - 例: `project_members` → `entities/project` に含める
- テーブルがない（送って終わり等の副作用）→ エンティティではない
  - 例: メール送信 → features から shared/api を直接呼ぶ

### フィーチャーの粒度
**1 feature = 1 ユーザーアクション**。例外なし。

- Good: `create-task`, `delete-task`, `assign-task`, `add-member`, `change-member-role`
- Bad: `manage-members`（add + change-role を束ねてしまう）

束ねたくなったら → それは **widgets の仕事**。

### feature と entities API の対応
各 feature は entities の専用 API 関数と 1:1 対応させる。

| feature | entities API |
|---|---|
| create-project | createProject |
| add-member | addProjectMember |
| change-member-role | changeProjectMemberRole |

## When to Use
- FSD プロジェクトで新しいスライスを追加するとき
- 「これはエンティティにすべきか？」と迷ったとき
- 「このフィーチャーは分けるべきか束ねるべきか？」と迷ったとき
