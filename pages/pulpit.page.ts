import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

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

  async executeQuickPayment(
    reciverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiver.selectOption(reciverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);
    await this.executeButton.click();
    await this.closeButton.click();
  }

  async  executeMobileToUp(
    reciverPhoneNumber: string,
    transferAmount: string,
  ): Promise<void> {
    await this.topupReceiver.selectOption(reciverPhoneNumber);
    await this.topupAmount.fill(transferAmount);
    await this.topupAgreement.click();
    await this.phoneButton.click();
    await this.closeButton.click();
  }
}
