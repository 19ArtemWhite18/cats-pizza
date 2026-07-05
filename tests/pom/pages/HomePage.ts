import { expect, type Page } from '@playwright/test';
import { CatsAPi } from '../api/mockApi/CatsApi';
import { CartApi } from '../api/mockApi/CartApi';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private getModalLocator() {
    return this.page.getByTestId('modal');
  }

  private getCartDrawerLocator() {
    return this.page.getByTestId('cartDrawer');
  }

  async open() {
    await this.page.goto('/');
  }

  async setUpApiEmptyCart() {
    const catsApi = new CatsAPi(this.page);
    const cartApi = new CartApi(this.page);

    await catsApi.setCatsItems();
    await cartApi.setEmptyCart();
  }

  async setUpApiCartWithItem() {
    const catsApi = new CatsAPi(this.page);
    const cartApi = new CartApi(this.page);

    await catsApi.setCatsItems();
    await cartApi.setCartWithOneItem();
  }

  async addFirstCatToCart() {
    await this.openItemDetailModal();
    await this.page.getByTestId('catModalAddToCartButton').click();
  }

  async openItemDetailModal() {
    await this.page.getByTestId('catCard_0').getByTestId('addToCartButton').click();
  }

  async openCart() {
    await this.page.getByTestId('openCartButton').click();
  }

  async goToCartPage() {
    await this.page.getByTestId('goToCartPageButton').click();
  }

  async goToCheckoutFromCart() {
    await this.openCart();
    await this.goToCartPage();
    await this.page.getByTestId('makeOrderButton').click();
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL('/');
    await expect(this.page.getByTestId('homePageHeader')).toBeVisible();
  }

  async assertCardsVisible() {
    const cards = this.page.getByTestId(/catCard/);
    await expect(cards.first()).toBeVisible();
    await expect(cards).toHaveCount(9);
  }

  async assertCartBadgeCount(count: number) {
    await expect(this.page.getByTestId('openCartButton')).toContainText(`${count}`);
  }

  async assertCartPageOpened() {
    await expect(this.page).toHaveURL(/\/cart$/);
    await expect(this.page.getByRole('heading', { name: 'Корзина' })).toBeVisible();
  }

  async assertCorrectPageViewWithItems() {
    await expect(this.page).toHaveScreenshot('homePageWithItems.png');
  }

  async assertCorrectPageViewWithOpenDetailModal() {
    await expect(this.getModalLocator()).toHaveScreenshot('detailItemModal.png');
  }

  async assertCorrectPageViewWithOpenCartEmptyDrawer() {
    await expect(this.getCartDrawerLocator()).toHaveScreenshot('cartEmptyDrawer.png');
  }

  async assertCorrectPageViewWithOpenCartDrawerWithOneItem() {
    await expect(this.getCartDrawerLocator()).toHaveScreenshot('cartDrawerWithOneItem.png');
  }
}
