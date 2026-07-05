import { type Page, expect } from '@playwright/test';
import { CartApi } from '../api/mockApi/CartApi';

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/cart', { timeout: 3000 });
  }

  async setUpApiEmptyCart() {
    const cartApi = new CartApi(this.page);
    await cartApi.setEmptyCart();
  }

  async setUpApiWithOneItem() {
    const cartApi = new CartApi(this.page);
    await cartApi.setCartWithOneItem();
  }

  async removeFirstItem() {
    await this.page.getByRole('button', { name: 'Удалить' }).first().click();
  }

  async clear() {
    await this.page.getByRole('button', { name: 'Очистить корзину' }).click();
  }

  async addOneMoreSameCat() {
    await this.page.getByRole('button', { name: '+' }).click();
  }

  async assertEmpty() {
    await expect(
      this.page.getByText('Корзина пуста. Добавьте котика с главной страницы.'),
    ).toBeVisible();
  }

  async assertCatCounter(value: string) {
    await expect(this.page.getByTestId('itemCounter')).toHaveValue(value);
  }

  async assertHasCorrectViewWithOneItem() {
    await expect(this.page).toHaveScreenshot('cartWithOneItem.png');
  }

  async assertHasCorrectEmptyView() {
    await expect(this.page).toHaveScreenshot('emptyCart.png');
  }
}
