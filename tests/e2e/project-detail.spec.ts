import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";
import { ProjectDetailPage } from "./pages/project-detail-page";

test.describe("プロジェクト詳細ページ", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs("user-1");
  });

  test("プロジェクト情報とタスク一覧が表示される", async ({ page }) => {
    const detailPage = new ProjectDetailPage(page);
    await detailPage.goto("proj-1");

    await expect(detailPage.projectTitle).toContainText("FSD 学習プロジェクト");

    // タスクセクションが存在する
    await expect(
      page.getByRole("heading", { name: "タスク" }),
    ).toBeVisible();

    // proj-1 のタスク (3件) が表示される
    await expect(page.getByText("shared レイヤーの設計")).toBeVisible();
    await expect(page.getByText("entities レイヤーの実装")).toBeVisible();
    await expect(page.getByText("認証機能の追加")).toBeVisible();
  });

  test("メンバー一覧が表示される", async ({ page }) => {
    const detailPage = new ProjectDetailPage(page);
    await detailPage.goto("proj-1");

    await expect(
      page.getByRole("heading", { name: "メンバー" }),
    ).toBeVisible();
  });

  test("ステータスでタスクをフィルタできる", async ({ page }) => {
    const detailPage = new ProjectDetailPage(page);
    await detailPage.goto("proj-1");

    // "完了" でフィルタ（「全ステータス」オプションを持つselectを特定）
    const statusFilter = page.locator("select").filter({ hasText: "全ステータス" });
    await statusFilter.selectOption("done");

    await expect(page).toHaveURL(/status=done/);
    await expect(page.getByText("shared レイヤーの設計")).toBeVisible();
    // 他のタスクはフィルタされて非表示になるはず
    await expect(page.getByText("認証機能の追加")).not.toBeVisible();
  });

  test("タスクをクリックすると詳細に遷移できる", async ({ page }) => {
    const detailPage = new ProjectDetailPage(page);
    await detailPage.goto("proj-1");

    await detailPage.clickTask("shared レイヤーの設計");

    // タスク詳細ページまたはモーダルが表示される
    await expect(page.getByText("shared レイヤーの設計")).toBeVisible();
  });
});
