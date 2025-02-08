import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import { generateUser } from '../fixtures/userFixture';
import * as data from '../fixtures/registerUser.json';
import LoginPage from '../pages/loginPage';

test.describe('Testes de autenticação', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Deve fazer login com sucesso', async ({ page }) => {
        const user = generateUser();

        await test.step('Realiza login com credenciais válidas', async () => {
            await loginPage.login(data.email, data.password);
        });

        await test.step('Verifica redirecionamento para a área da conta', async () => {
            await expect(loginPage.page).toHaveURL(/route=account\/account/);
        });

        await test.step('Verifica exibição do título "My Account"', async () => {
            await expect(loginPage.page.locator('(//h2[contains(@class,"card-header")])[1]')).toHaveText('My Account');
        });
    });

    test('Deve exibir mensagem de erro com credenciais inválidas', async ({ page }) => {
        const user = generateUser();

        await test.step('Tenta fazer login com credenciais inválidas', async () => {
            await loginPage.login('usuarioinvalido@example.com', 'senhaIncorreta');
        });

        await test.step('Verifica exibição da mensagem de erro', async () => {
            await expect(loginPage.getErrorMessage()).resolves.toContain(' Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.');
        });
    });

    test('Deve efetuar logout com sucesso', async ({ page }) => {
        await test.step('Realiza login com credenciais válidas', async () => {
            await loginPage.login(data.email, data.password);
        });

        await test.step('Realiza logout', async () => {
            await loginPage.logout();
        });

        await test.step('Verifica redirecionamento para a página de login', async () => {
            await expect(page).toHaveURL(/logout/);
            await expect(page.locator('h1')).toHaveText('Account Logout');
        });
    });

    test.afterAll(async ({ browser }) => {
        await browser.close();
    });
});