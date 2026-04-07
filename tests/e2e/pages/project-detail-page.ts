import { type Page, type Locator } from "@playwright/test";

export class ProjectDetailPage {
  readonly page: Page;
  readonly projectTitle: Locator;
  readonly taskSection: Locator;
  readonly taskCards: Locator;
  readonly memberSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.projectTitle = page.locator("h1");
    this.taskSection = page.getByRole("heading", { name: "タスク" }).locator("..");
    this.taskCards = page.locator("a[href*='/tasks/']");
    this.memberSection = page.getByRole("heading", { name: "メンバー" }).locator("..");
  }

  async goto(projectId: string) {
    await this.page.goto(`/projects/${projectId}`);
  }

  async clickTask(title: string) {
    await this.page.getByRole("link", { name: title }).click();
  }
}
