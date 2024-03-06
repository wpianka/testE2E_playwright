import { Page } from '@playwright/test';

export class PulpitPage {
  constructor(private page: Page) {}

  transferReceiver = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');
  executeButton = this.page.locator('#execute_btn');
  closeButton = this.page.getByTestId('close-button');
  showMessages = this.page.locator('#show_messages');

  topupReceiver = this.page.locator('#widget_1_topup_receiver');
  topupAmount = this.page.locator('#widget_1_topup_amount');
  topupAgreement = this.page.locator('#widget_1_topup_agreement');
  phoneButton = this.page.locator('#execute_phone_btn');

  moneyValue = this.page.locator('#money_value');
  userNameText = this.page.getByTestId('user-name');
}
