import { type Page, type Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly projectCards: Locator;
  readonly createProjectNameInput: Locator;

  readonly createProjectButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "マイプロジェクト" });
    this.projectCards = page.locator("a[href^='/projects/']");
    this.createProjectNameInput = page.locator("input[name='name']");

    this.createProjectButton = page.getByRole("button", { name: "作成" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async clickProject(name: string) {
    await this.page.getByRole("link", { name }).click();
  }
}
