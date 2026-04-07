import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";

test.describe("ナビゲーション", () => {
  test("ヘッダーのProjectHubリンクでホームに戻れる", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs("user-1");

    // プロジェクト詳細に移動
    await page.goto("/projects/proj-1");
    await expect(page).toHaveURL(/\/projects\/proj-1/);

    // ヘッダーのロゴリンクをクリック
    await page
      .locator("header")
      .getByRole("link", { name: "ProjectHub" })
      .click();
    await expect(page).toHaveURL("/");
  });

  test("未ログイン時にホームにアクセスするとログインページが表示される", async ({ page }) => {
    await page.goto("/");

    // 未ログインの場合、ログインフォームが表示される
    await expect(page.getByRole("heading", { name: "ProjectHub" })).toBeVisible();
    await expect(page.getByText("ログインしてください")).toBeVisible();
  });
});
