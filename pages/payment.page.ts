import { Page } from 'playwright-core';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiver = this.page.getByTestId('transfer_receiver');
  formAccountTo = this.page.getByTestId('form_account_to');
  formAmount = this.page.getByTestId('form_amount');
  formButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  closeButton = this.page.getByTestId('close-button');
  showMessages = this.page.locator('#show_messages');

  async payment(
    transferReceiver: string,
    transferAccount: string,
    transferAmount: string,
  ): Promise<void> {
    await this.transferReceiver.fill(transferReceiver);
    await this.formAccountTo.fill(transferAccount);
    await this.formAmount.fill(transferAmount);
    await this.formButton.click();
    await this.closeButton.click();
  }
}
