import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";

test.describe("タスク詳細ページ", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs("user-1");
  });

  test("タスクの詳細情報が表示される", async ({ page }) => {
    await page.goto("/projects/proj-1/tasks/task-1");

    // タスクタイトル
    await expect(
      page.getByRole("heading", { name: "shared レイヤーの設計" }),
    ).toBeVisible();

    // 説明
    await expect(
      page.getByText("共通 UI コンポーネントとユーティリティを整備する"),
    ).toBeVisible();

    // 担当者
    await expect(page.getByText("担当:")).toBeVisible();
  });

  test("コメント一覧が表示される", async ({ page }) => {
    await page.goto("/projects/proj-1/tasks/task-1");

    // コメントセクション (task-1 には 2件のコメント)
    await expect(page.getByRole("heading", { name: /コメント/ })).toBeVisible();
    await expect(
      page.getByText("shared/ui の Button と Card ができました"),
    ).toBeVisible();
    await expect(
      page.getByText("Badge コンポーネントも追加してもらえますか"),
    ).toBeVisible();
  });

  test("コメント投稿フォームが表示される", async ({ page }) => {
    await page.goto("/projects/proj-1/tasks/task-1");

    await expect(
      page.getByPlaceholder("コメントを入力"),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "コメント" }),
    ).toBeVisible();
  });

  test("プロジェクトに戻るリンクが機能する", async ({ page }) => {
    await page.goto("/projects/proj-1/tasks/task-1");

    await page.getByText("に戻る").click();

    await expect(page).toHaveURL(/\/projects\/proj-1/);
  });
});
