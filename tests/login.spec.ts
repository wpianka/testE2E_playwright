import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';

test.describe('User login to Demobank', () => {
  const userId = 'test1234';
  const userPassword = 'test1234';

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const expectedUserName = 'Jan Demobankowy';

    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const fakeUseId = 'test';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    //Act
    await page.getByTestId('login-input').fill(fakeUseId);
    await page.getByTestId('login-input').press('Tab');

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expectedErrorMessage,
    );
  });
  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const fakePassword = '1234';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(fakePassword);
    await page.getByTestId('password-input').press('Tab');

    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expectedErrorMessage,
    );
  });
});
