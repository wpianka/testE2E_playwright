import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit test', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');

    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('quick payment with current data', async ({ page }) => {
    // Arrange
    const reciverId = '2';
    const transferAmount = '120';
    const transferTitle = 'Zwrot środków';
    const expectedTramsferReciver = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTramsferReciver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act

    const pulpitPage = new PulpitPage(page);

    await pulpitPage.transferReceiver.selectOption(reciverId);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);
    await pulpitPage.executeButton.click();
    await pulpitPage.closeButton.click();

    //Assert
    await expect(pulpitPage.showMessages).toHaveText(expectedMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const reciverPhoneNumber = '500 xxx xxx';
    const transferAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${transferAmount},00PLN na numer ${reciverPhoneNumber}`;

    //Act
    const pulpitPage = new PulpitPage(page);

    await pulpitPage.topupReceiver.selectOption(reciverPhoneNumber);
    await pulpitPage.topupAmount.fill(transferAmount);
    await pulpitPage.topupAgreement.click();
    await pulpitPage.phoneButton.click();
    await pulpitPage.closeButton.click();

    //Assert
    await expect(pulpitPage.showMessages).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const reciverPhoneNumber = '500 xxx xxx';
    const transferAmount = '50';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(transferAmount);

    //Act

    const pulpitPage = new PulpitPage(page);

    await pulpitPage.topupReceiver.selectOption(reciverPhoneNumber);
    await pulpitPage.topupAmount.fill(transferAmount);
    await pulpitPage.topupAgreement.click();
    await pulpitPage.phoneButton.click();
    await pulpitPage.closeButton.click();

    //Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
