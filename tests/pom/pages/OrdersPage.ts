import { type Page, expect } from '@playwright/test';

export class OrdersPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.getByTestId('openOrdersButton').click();
  }

  async assertHasOrder() {
    await expect(this.page.getByTestId('ordersList').getByRole('listitem').first()).toBeVisible();
  }
}
