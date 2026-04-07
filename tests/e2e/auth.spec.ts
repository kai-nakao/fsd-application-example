import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";

test.describe("認証フロー", () => {
  test("ログインページが正しく表示される", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.userSelect).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();

    // ユーザー選択肢が存在する
    const options = loginPage.userSelect.locator("option");
    await expect(options).toHaveCount(3);
  });

  test("ユーザーを選択してログインできる", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.loginAs("user-1");

    // ホームページにリダイレクトされる
    await expect(page).toHaveURL("/");
    await expect(
      page.getByRole("heading", { name: "マイプロジェクト" }),
    ).toBeVisible();

    // ヘッダーにユーザー名が表示される
    await expect(page.getByText("田中太郎")).toBeVisible();
  });

  test("ログアウトできる", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs("user-1");

    // ログアウトボタンをクリック
    await page.getByRole("button", { name: "ログアウト" }).click();

    // ログインページにリダイレクトされる
    await expect(page).toHaveURL("/login");
  });
});
