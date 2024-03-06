import { Page } from 'playwright-core';

export class SideMenuComponent {
  constructor(private page: Page) {}
  paymentButton = this.page.getByRole('link', { name: 'płatności' });
}
