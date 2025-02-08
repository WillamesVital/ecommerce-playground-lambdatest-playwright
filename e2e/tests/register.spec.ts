import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import { generateUser } from '../fixtures/userFixture';
import * as data from '../fixtures/registerUser.json';

test('Deve registrar um novo usuário com sucesso', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const user = generateUser();

await test.step('Navigate to register page', async () => {
  await registerPage.navigate();
});

await test.step('Fill form and submit', async () => {
  await registerPage.fillForm(user.firstName, user.lastName, user.email, user.telephone, user.password);
  await registerPage.agreeToPrivacyPolicy();
  await registerPage.submitForm();
});

await test.step('Verify success message', async () => {
  await expect(page).toHaveURL(/route=account\/success/);
  await expect(registerPage.page.locator('h1')).toHaveText('Your Account Has Been Created!');
});

});