import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login-page";
import { HomePage } from "./pages/home-page";

test.describe("ホームページ", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs("user-1");
  });

  test("プロジェクト一覧が表示される", async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.heading).toBeVisible();
    // user-1 は proj-1 と proj-2 のメンバー
    const projectLinks = homePage.projectCards;
    await expect(projectLinks.first()).toBeVisible();
  });

  test("プロジェクト作成フォームが表示される", async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.createProjectNameInput).toBeVisible();
    await expect(homePage.createProjectButton).toBeVisible();
  });

  test("プロジェクト詳細ページに遷移できる", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.clickProject("FSD 学習プロジェクト");

    await expect(page).toHaveURL(/\/projects\/proj-1/);
    await expect(
      page.getByRole("heading", { name: "FSD 学習プロジェクト" }),
    ).toBeVisible();
  });
});
