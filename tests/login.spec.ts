import { test, expect } from "@playwright/test";

test.describe("User login to Demobank", () => {
  test("successful login with correct credentials", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("test1234");
    await page.getByTestId("password-input").fill("test1234");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("test");
    await page.getByTestId("login-input").press("Tab");

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków"
    );
  });
  test("unsuccessful login with too short password", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("test1234");
    await page.getByTestId("password-input").fill("1234");
    await page.getByTestId("password-input").press("Tab");

    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków"
    );
  });
});
