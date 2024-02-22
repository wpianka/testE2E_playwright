import { test, expect } from "@playwright/test";

test.describe("User login to Demobank", () => {
  test("successful login with correct credentials", async ({ page }) => {
    // Arrange
    const url = "https://demo-bank.vercel.app/";
    const useId = "test1234";
    const userPassword = "test1234";
    const expectedUserName = "Jan Demobankowy";

    //Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(useId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    //Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
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
