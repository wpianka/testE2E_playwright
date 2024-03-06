import { Page } from 'playwright-core';

export class PaymentPage {
  constructor(private page: Page) {}

  transferReceiver = this.page.getByTestId('transfer_receiver');
  formAccountTo = this.page.getByTestId('form_account_to');
  formAmount = this.page.getByTestId('form_amount');
  formButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  closeButton = this.page.getByTestId('close-button');
  showMessages = this.page.locator('#show_messages');
}
