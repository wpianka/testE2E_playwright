import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');

  errorLogin = this.page.getByTestId('error-login-id');
  errorPassword = this.page.getByTestId('error-login-password');

  async login(userId: string, userPassword: string): Promise<void> {
    await this.loginInput.fill(userId);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}
