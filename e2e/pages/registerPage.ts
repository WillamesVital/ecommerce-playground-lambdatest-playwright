import { Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/register');
  }

  async fillForm(firstName: string, lastName: string, email: string, telephone: string, password: string) {
    await this.page.fill('#input-firstname', firstName);
    await this.page.fill('#input-lastname', lastName);
    await this.page.fill('#input-email', email);
    await this.page.fill('#input-telephone', telephone);
    await this.page.fill('#input-password', password);
    await this.page.fill('#input-confirm', password);
  }

  async agreeToPrivacyPolicy() {
    await this.page.locator('//div[contains(@class,"custom-checkbox")]').click();
  }

  async submitForm() {
    await this.page.locator('input[value="Continue"]').click();
  }

  async getSuccessMessage() {
    return this.page.locator('.alert-success').textContent();
  }
}