import { type Page } from '@playwright/test';
import { cart } from '../../mockData/cart';

export class CartApi {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async setCatsItems() {
    await this.page.route('*/**/api/cart', async (route) => {
      await route.fulfill({ status: 200, body: JSON.stringify(cartWithOneItem) });
    });
  }
}
