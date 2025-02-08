import { Page } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('#input-email', email);
    await this.page.fill('#input-password', password);
    await this.page.click('input[value="Login"]');
  }

  async getErrorMessage() {
    return this.page.textContent('.alert-danger');
  }

  async isLoggedIn() {
    return this.page.url().includes('account/account');
  }

  async logout() {
    await this.page.hover('//a[contains(@class,"dropdown-toggle")]//span[@class="title" and contains(text(),"My account")]');
    await this.page.click('text=Logout');
  }
}