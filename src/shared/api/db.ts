// 全エンティティのインメモリストア
// Phase ごとにエンティティを追加していく

export type DbUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
};

export const db = {
  users: [
    {
      id: "user-1",
      name: "田中太郎",
      email: "tanaka@example.com",
      createdAt: "2026-01-01T00:00:00Z",
    },
    {
      id: "user-2",
      name: "佐藤花子",
      email: "sato@example.com",
      createdAt: "2026-01-15T00:00:00Z",
    },
    {
      id: "user-3",
      name: "鈴木一郎",
      email: "suzuki@example.com",
      createdAt: "2026-02-01T00:00:00Z",
    },
  ] as DbUser[],
};
