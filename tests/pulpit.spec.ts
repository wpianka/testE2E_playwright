import { test, expect } from '@playwright/test';

test.describe('Pulpit test', () => {
  test('quick payment with current data', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const useId = 'test1234';
    const userPassword = 'test1234';
    const expectedUserName = 'Jan Demobankowy';

    const reciverId = '2';
    const transferAmount = '120';
    const transferTitle = 'Zwrot środków';
    const expectedTramsferReciver = 'Chuck Demobankowy';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(useId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption(reciverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTramsferReciver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('test1234');
    await page.getByTestId('password-input').fill('test1234');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('50');
    await page.locator('#widget_1_topup_agreement').click();
    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx',
    );
  });
});
