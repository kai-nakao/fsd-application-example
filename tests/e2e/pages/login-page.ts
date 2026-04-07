import { type Page, type Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly userSelect: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "ProjectHub" });
    this.userSelect = page.locator("select[name='userId']");
    this.submitButton = page.getByRole("button", { name: "ログイン" });
  }

  async goto() {
    await this.page.goto("/login");
  }

  async loginAs(userId: string) {
    await this.userSelect.selectOption(userId);
    await this.submitButton.click();
    await this.page.waitForURL("/");
  }
}
