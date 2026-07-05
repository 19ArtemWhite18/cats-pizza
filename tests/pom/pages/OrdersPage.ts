import { type Page, expect } from '@playwright/test';
import { OrdersApi } from '../api/mockApi/OrdersApi';
import { AuthApi } from '../api/mockApi/AuthApi';

export class OrdersPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.getByTestId('openOrdersButton').click();
  }

  async openPage() {
    await this.page.goto('/orders');
  }

  async setApiWithOneItem() {
    const ordersApi = new OrdersApi(this.page);
    const authApi = new AuthApi(this.page);
    await ordersApi.setOrdersWithOneItem();
    await authApi.setUpAuth();
  }

  async setApiEmptyItems() {
    const ordersApi = new OrdersApi(this.page);
    const authApi = new AuthApi(this.page);
    await ordersApi.setEmptyOrders();
    await authApi.setUpAuth();
  }

  async assertHasOrder() {
    await expect(this.page.getByTestId('ordersList').getByRole('listitem').first()).toBeVisible();
  }

  async assertHasCorrectPageViewWithOneOrder() {
    await expect(this.page).toHaveScreenshot('ordersListWithOneItem.png');
  }

  async assertHasCorrectPageViewEmptyOrdersList() {
    await expect(this.page).toHaveScreenshot('ordersEmptyList.png');
  }
}
