import type { Page } from '@playwright/test';
import { fakeAuth } from '../../mockData/auth';

export class AuthApi {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async setUpAuth() {
    await this.page.addInitScript((auth) => {
      window.localStorage.setItem('auth', JSON.stringify(auth));
    }, fakeAuth);
  }
}
