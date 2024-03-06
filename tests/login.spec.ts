import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User login to Demobank', () => {
  const userId = loginData.userId;
  const userPassword = loginData.password;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });
  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const expectedUserName = 'Jan Demobankowy';

    //Act
    await loginPage.login(userId, userPassword);

    //Assert
    const pulpitPage = new PulpitPage(page);
    await expect(pulpitPage.userNameText).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const fakeUseId = 'test';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    //Act
    await loginPage.loginInput.fill(fakeUseId);
    await loginPage.passwordInput.click();

    //Assert
    await expect(loginPage.errorLogin).toHaveText(expectedErrorMessage);
  });
  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const fakePassword = '1234';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    //Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(fakePassword);
    await loginPage.passwordInput.blur();

    //Assert
    await expect(loginPage.errorPassword).toHaveText(expectedErrorMessage);
  });
});
