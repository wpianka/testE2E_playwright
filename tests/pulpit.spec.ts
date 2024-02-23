import { test, expect } from '@playwright/test';

test.describe('Pulpit test', () => {
  test.beforeEach(async ({ page }) => {
    const userId = 'test1234';
    const userPassword = 'test1234';

    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
  });

  test('quick payment with current data', async ({ page }) => {
    // Arrange
    // const expectedUserName = 'Jan Demobankowy';

    const reciverId = '2';
    const transferAmount = '120';
    const transferTitle = 'Zwrot środków';
    const expectedTramsferReciver = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTramsferReciver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act

    await page.locator('#widget_1_transfer_receiver').selectOption(reciverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const reciverPhoneNumber = '500 xxx xxx';
    const transferAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${transferAmount},00PLN na numer ${reciverPhoneNumber}`;

    //Act

    await page
      .locator('#widget_1_topup_receiver')
      .selectOption(reciverPhoneNumber);
    await page.locator('#widget_1_topup_amount').fill(transferAmount);
    await page.locator('#widget_1_topup_agreement').click();
    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test.only('correct balance after successful mobile top-up', async ({
    page,
  }) => {
    // Arrange
    const reciverPhoneNumber = '500 xxx xxx';
    const transferAmount = '50';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(transferAmount);

    //Act

    await page
      .locator('#widget_1_topup_receiver')
      .selectOption(reciverPhoneNumber);
    await page.locator('#widget_1_topup_amount').fill(transferAmount);
    await page.locator('#widget_1_topup_agreement').click();
    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
